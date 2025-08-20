import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compareAlphabeticalCaseInsensitive, getSingleGenomeLocation, findFminFmax } from '../../lib/utils';
import SynonymList from '../../components/synonymList.jsx';
import { AlleleCell, DataTable } from '../../components/dataTable';
import NoData from '../../components/noData.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import ExternalLink from '../../components/ExternalLink.jsx';
import { VariantJBrowseLink } from '../../components/variant';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell.jsx';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell.jsx';
import VariantsSequenceViewer from './VariantsSequenceViewer.jsx';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import useAllVariants from '../../hooks/useAllVariants';
import useAlleleSelection from '../../hooks/useAlleleSelection';
import { ALLELE_WITH_ONE_VARIANT, ALLELE_WITH_MULTIPLE_VARIANTS, HELP_EMAIL } from '../../constants';

const AlleleTable = ({ isLoadingGene, gene, geneId }) => {
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);

  // Regular table query
  const tableProps = useDataTableQuery(`/api/gene/${geneId}/alleles`);
  const { data: resolvedData, totalRows, isLoading } = tableProps;

  // Use custom hook for allele selection
  const {
    alleleIdsSelected,
    setAlleleIdsSelected,
    selectionOverride,
    isLoadingSelectedAlleles,
    selectedAllelesData,
    selectedAllelesError,
    handleAllelesSelect,
    clearAlleleSelection,
  } = useAlleleSelection(tableProps);

  // Local state for pagination when in override mode
  const [overridePage, setOverridePage] = useState(1);
  const [overridePageSize, setOverridePageSize] = useState(10);

  // Reset to page 1 when entering/exiting override mode
  React.useEffect(() => {
    if (selectionOverride.active) {
      setOverridePage(1);
    }
  }, [selectionOverride.active]);

  // Get pagination info - use override values when in override mode
  const currentPage = selectionOverride.active ? overridePage : (tableProps.tableState?.page || 1);
  const pageSize = selectionOverride.active ? overridePageSize : (tableProps.tableState?.size || 10);

  // Custom table state handler for override mode
  const handleTableStateChange = useCallback((newState) => {
    if (selectionOverride.active) {
      // In override mode, handle pagination locally
      let shouldResetPage = false;
      
      // Check if size is actually changing
      if (newState.sizePerPage !== undefined && newState.sizePerPage !== overridePageSize) {
        setOverridePageSize(newState.sizePerPage);
        shouldResetPage = true;
      } else if (newState.size !== undefined && newState.size !== overridePageSize) {
        // Also handle 'size' for backwards compatibility
        setOverridePageSize(newState.size);
        shouldResetPage = true;
      }
      
      // Update page - either to the requested page or reset to 1 if size changed
      if (shouldResetPage) {
        setOverridePage(1);
      } else if (newState.page !== undefined) {
        setOverridePage(newState.page);
      }
    } else {
      // Not in override mode, use the original handler
      tableProps.setTableState(newState);
    }
  }, [selectionOverride.active, overridePageSize, tableProps.setTableState]);

  const data = useMemo(() => {
    // Use selected alleles data when in override mode and data is available
    const baseData = selectionOverride.active && selectedAllelesData ? selectedAllelesData : resolvedData || [];

    let processedData = baseData.map((allele) => ({
      ...allele,
      symbol: allele.symbol,
      synonym: allele.synonyms,
      source: {
        dataProvider: gene.dataProvider,
        url: allele.crossReferenceMap.primary.url,
      },
      disease: allele.diseases?.sort(compareAlphabeticalCaseInsensitive((disease) => disease.name)),
    }));

    // Filter to only show the selected alleles when in override mode
    if (selectionOverride.active && selectionOverride.alleleIds.length > 0) {
      processedData = processedData.filter((allele) => selectionOverride.alleleIds.includes(allele.id));
      
      // Apply client-side pagination when in override mode
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return processedData.slice(startIndex, endIndex);
    }

    return processedData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedData, selectionOverride, selectedAllelesData, currentPage, pageSize]);

  const hasAlleles = totalRows > 0;
  const hasManyAlleles = totalRows > 20000;

  // filtered but not paginate list of alleles
  const allelesFiltered = useAllVariants(geneId, tableProps.tableState);

  const variantsSequenceViewerProps = useMemo(() => {
    const variantsFiltered =
      allelesFiltered.data && allelesFiltered.data.results
        ? allelesFiltered.data.results.flatMap((allele) => (allele && allele.variants) || [])
        : [];
    const variantLocations = variantsFiltered.map((variant) => variant && variant.location);
    
    // Use only gene bounds to prevent viewer from showing excessive region
    // This keeps the focus on the target gene instead of expanding based on distant variants
    const { fmin, fmax } = findFminFmax([geneLocation]);

    // Filter to only show variants for alleles with associated variants by default
    // When in override mode, use the selected alleles for viewer visibility
    const alleleIdsFiltered = selectionOverride.active
      ? selectedAllelesData
        ? selectedAllelesData
            .filter(
              (allele) =>
                allele.category === ALLELE_WITH_ONE_VARIANT || allele.category === ALLELE_WITH_MULTIPLE_VARIANTS
            )
            .map((allele) => allele.id)
        : []
      : allelesFiltered.data && allelesFiltered.data.results
        ? allelesFiltered.data.results
            .filter(
              (allele) =>
                allele.category === ALLELE_WITH_ONE_VARIANT || allele.category === ALLELE_WITH_MULTIPLE_VARIANTS
            )
            .map((allele) => allele.id)
        : [];

    /*
       Warning!
       The data format here should be agreed upon by the maintainers of the VariantsSequenceViewer.
       Changes might break the VariantsSequenceViewer.
    */
    const formatAllele = (alleleId) => ({
      id: alleleId,
    });

    const props = {
      gene: gene,
      fmin: fmin,
      fmax: fmax,
      hasVariants: Boolean(variantsFiltered && variantsFiltered.length),
      allelesSelected: alleleIdsSelected.map(formatAllele),
      allelesVisible: alleleIdsFiltered.map(formatAllele),
      onAllelesSelect: handleAllelesSelect,
    };

    return props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedData, allelesFiltered.data, alleleIdsSelected, handleAllelesSelect, selectionOverride.active, selectedAllelesData]);

  const selectRow = useMemo(
    () => ({
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      selected: alleleIdsSelected,
      onSelect: (row) => {
        const alleleIdRow = row.id;
        setAlleleIdsSelected((alleleIdsSelectedPrev) => {
          if (alleleIdsSelectedPrev.includes(alleleIdRow)) {
            const indexAlleleId = alleleIdsSelectedPrev.indexOf(alleleIdRow);
            return [
              ...alleleIdsSelectedPrev.slice(0, indexAlleleId),
              ...alleleIdsSelectedPrev.slice(indexAlleleId + 1),
            ];
          } else {
            return [...alleleIdsSelectedPrev, alleleIdRow];
          }
        });
      },
      style: { backgroundColor: '#ffffd4' },
    }),
    [alleleIdsSelected, setAlleleIdsSelected]
  );

  const variantNameColWidth = 300;
  const variantTypeColWidth = 150;
  const variantConsequenceColWidth = 150;

  const columns = [
    {
      dataField: 'id',
      text: 'Allele ID',
      hidden: true,
      isKey: true,
    },
    {
      dataField: 'symbol',
      text: 'Allele/Variant Symbol',
      helpPopupProps: {
        id: 'gene-page--alleles-table--allele-variant-symbol-help',
        children: (
          <span>
            Organism specific official nomenclature for the allele or{' '}
            <ExternalLink href="https://varnomen.hgvs.org/recommendations/general/" target="_blank">
              HGVS
            </ExternalLink>{' '}
            (Human Genome Variation Society) based nomenclature for the variants.
          </span>
        ),
      },
      formatter: (_, allele) => <AlleleCell allele={allele} />,
      headerStyle: { width: '185px' },
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'synonyms',
      text: 'Allele Synonyms',
      formatter: (synonyms) => <SynonymList synonyms={synonyms} />,
      headerStyle: { width: '165px' },
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'category',
      text: 'Category',
      helpPopupProps: {
        id: 'gene-page--alleles-table--allele-category-help',
        children: (
          <span>
            An indication of whether the referenced object is an allele where the genomic location of the nucleotide
            change in not known ("allele"), an allele where one or more genomic locations of nucleotide change(s) are
            known ("allele with N associated variant(s)"), or a variant, i.e., a specific nucleotide change at a
            specified location on the genome ("variant").
          </span>
        ),
      },
      headerStyle: { width: '140px' },
      filterName: 'alleleCategory',
      filterType: 'checkbox',
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'variants',
      text: 'Variant',
      helpPopupProps: {
        id: 'gene-page--alleles-table--allele-variant-help',
        children: (
          <span>
            A unique identifier consisting of the{' '}
            <ExternalLink href="https://varnomen.hgvs.org/recommendations/general/" target="_blank">
              HGVS nomenclature
            </ExternalLink>{' '}
            or reference{' '}
            <ExternalLink href="https://www.ncbi.nlm.nih.gov/snp/docs/RefSNP_about/" target="_blank">
              SNP (rs) ID
            </ExternalLink>{' '}
            for the variant. Identifiers in this column link to the Alliance JBrowse for this species.
          </span>
        ),
      },
      formatter: (variants) => (
        <div>
          {variants?.map(({ id, variantType: type = {}, location = {}, transcriptLevelConsequence }) => (
            <div key={id} style={{ display: 'flex' }}>
              <div
                style={{
                  width: variantNameColWidth,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingRight: 5,
                  flex: '0 0 auto',
                }}
              >
                {
                  <VariantJBrowseLink
                    geneLocation={geneLocation}
                    geneSymbol={gene.symbol}
                    location={location}
                    species={gene.species && gene.species.name}
                    type={type.name}
                    taxonid={gene.species && gene.species.taxonId}
                  >
                    {id}
                  </VariantJBrowseLink>
                }
              </div>
              <div
                style={{
                  width: variantTypeColWidth,
                  flex: '0 0 auto',
                }}
              >
                {type && type.name && type.name.replace(/_/g, ' ')}
              </div>
              <div
                style={{
                  width: variantConsequenceColWidth,
                  flex: '0 0 auto',
                }}
              >
                <CollapsibleList collapsedSize={1}>
                  {[
                    ...new Set(
                      transcriptLevelConsequence &&
                        transcriptLevelConsequence
                          .flatMap(({ molecularConsequences }) => molecularConsequences)
                          .map((c) => c.replace(/_/g, ' '))
                    ),
                  ]}
                </CollapsibleList>
              </div>
            </div>
          ))}
        </div>
      ),
      attrs: {
        colSpan: 3,
      },
      headerStyle: { width: variantNameColWidth },
      //style: {width: variantNameColWidth + variantTypeColWidth + variantConsequenceColWidth + 50},
      filterable: false,
    },
    {
      dataField: 'variantType',
      text: 'Variant type',
      headerStyle: { width: variantTypeColWidth },
      style: {
        display: 'none',
      },
      filterType: 'checkbox',
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'variants.transcriptLevelConsequence',
      text: 'Molecular consequence',
      helpPopupProps: {
        id: 'gene-page--alleles-table--molecular-consequence-help',
        children: (
          <span>
            Variant consequences were predicted by the{' '}
            <ExternalLink href="https://www.ensembl.org/info/docs/tools/vep/index.html" target="_blank">
              Ensembl Variant Effect Predictor (VEP) tool
            </ExternalLink>{' '}
            based on Alliance variants information. Examples are: frameshift variant, stop gained, missense variant,
            splice donor variant, splice acceptor variant, stop gained, splice region variant, intron variant, coding
            sequence variant, 5 prime UTR variant, and inframe deletion.
          </span>
        ),
      },
      headerStyle: { width: variantConsequenceColWidth },
      style: {
        display: 'none',
      },
      filterName: 'molecularConsequence',
      filterType: 'checkbox',
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'hasDisease',
      text: 'Has Disease Annotations',
      formatter: (hasDisease, allele) => (
        <BooleanLinkCell to={`/allele/${allele.id}#disease-associations`} value={hasDisease} />
      ),
      headerNode: <RotatedHeaderCell>Has Disease Annotations</RotatedHeaderCell>,
      headerStyle: {
        paddingLeft: 0,
        width: '50px',
        height: '130px',
      },
      filterable: selectionOverride.active ? false : ['true', 'false'],
      filterFormatter: (val) => (val === 'true' ? 'Yes' : 'No'),
    },
    {
      dataField: 'hasPhenotype',
      text: 'Has Phenotype Annotations',
      formatter: (hasPhenotype, allele) => (
        <BooleanLinkCell to={`/allele/${allele.id}#phenotypes`} value={hasPhenotype} />
      ),
      headerNode: <RotatedHeaderCell>Has Phenotype Annotations</RotatedHeaderCell>,
      headerStyle: {
        paddingLeft: 0,
        width: '115px', // wider because this one is on the end!
        height: '145px',
      },
      filterable: selectionOverride.active ? false : ['true', 'false'],
      filterFormatter: (val) => (val === 'true' ? 'Yes' : 'No'),
    },
    // {
    //   dataField: 'source',
    //   text: 'Source',
    //   formatter: source => <ExternalLink href={source.url}>{source.dataProvider}</ExternalLink>,
    //   filterable: true,
    // },
  ];

  const sortOptions = [
    // {
    //   value: 'alleleSymbol',
    //   label: 'Allele symbol',
    // }, // default
    {
      value: 'variant',
      label: 'Variant',
    },
    {
      value: 'variantType',
      label: 'Variant type',
    },
    {
      value: 'molecularConsequence',
      label: 'Molecular consequence',
    },
  ];

  return (
    <>
      {
        isLoading || isLoadingGene ? null : variantsSequenceViewerProps.hasVariants ? (
          <VariantsSequenceViewer {...variantsSequenceViewerProps} />
        ) : hasAlleles ? (
          <NoData>No mapped variant information available</NoData>
        ) : null /* in this case, the whole section is empty, and default no data message kicks in */
      }
      {selectionOverride.active && (
        <div className="alert alert-info mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <span>
              <i className="fa fa-filter" /> Showing {selectionOverride.alleleIds.length} selected variant
              {selectionOverride.alleleIds.length !== 1 ? 's' : ''} from viewer
            </span>
            <button className="btn btn-sm btn-outline-primary" onClick={clearAlleleSelection}>
              <i className="fa fa-times" /> Clear Selection & Show All
            </button>
          </div>
          <small className="text-muted">
            <strong>Note:</strong> Table filtering and sorting are temporarily disabled while viewing selected variants
            from the genome feature viewer.
          </small>
        </div>
      )}
      {selectedAllelesError && (
        <div className="alert alert-danger mb-2" role="alert">
          <strong>Unable to load selected variants</strong>
          <br />
          <small className="text-muted">
            Please refresh the page to try again. If this error persists, contact us at{' '}
            <a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>
          </small>
        </div>
      )}
      <div className="position-relative">
        <DataTable
          {...(selectionOverride.active ? 
            // When in override mode, spread tableProps but override specific properties
            {
              ...tableProps,
              tableState: {
                ...tableProps.tableState,
                page: overridePage,
                sizePerPage: overridePageSize,
                size: overridePageSize
              },
              setTableState: handleTableStateChange
            } : 
            // When not in override mode, use tableProps as-is
            tableProps
          )}
          columns={columns}
          data={data}
          totalRows={selectionOverride.active ? (selectedAllelesData ? selectedAllelesData.length : 0) : totalRows}
          downloadUrl={`/api/gene/${geneId}/alleles/download`}
          keyField="id"
          rowStyle={{ cursor: 'pointer' }}
          selectRow={selectRow}
          sortOptions={sortOptions}
        />
        <div className="d-flex flex-column align-items-start my-2 mx-auto">
          {hasAlleles ? (
            <div className="d-flex flex-row align-items-center justify-content-start">
              <Link
                className={'btn btn-primary ' + (hasManyAlleles ? 'disabled' : '')}
                to={`/gene/${geneId}/allele-details`}
              >
                View detailed Alleles/Variants information
              </Link>
              {hasManyAlleles ? (
                <NoData>
                  <div className="ml-2">
                    Detailed information is disabled due to large number of variants.
                    <br />
                    Please use the download link below to retrieve details for all gene alleles/variants.
                  </div>
                </NoData>
              ) : null}
            </div>
          ) : null}
          <Link className="btn btn-link" to={'/downloads#variants-alleles'}>
            Download all Alleles/Variants for all genes of the species
          </Link>
        </div>
      </div>
    </>
  );
};

AlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default AlleleTable;
