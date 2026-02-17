import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compareAlphabeticalCaseInsensitive, getSingleGenomeLocation, getGenomicLocations, getSpeciesNameCorrected, findFminFmax } from '../../lib/utils';
import SynonymListCuration from '../../components/SynonymListCuration.jsx';
import { AlleleCell, AlleleCellCuration, DataTable } from '../../components/dataTable';
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
import { getIdentifier, getDistinctFieldValue } from '../../components/dataTable/utils.jsx';

const AlleleTable = ({ isLoadingGene, gene, geneId }) => {
  const genomeLocations = getGenomicLocations(gene);
  const geneLocation = getSingleGenomeLocation(genomeLocations);
  const geneSymbolText = gene.geneSymbol?.displayText;
  const speciesName = getSpeciesNameCorrected(gene.taxon?.name);
  const taxonId = gene.taxon?.curie;

  // Regular table query
  const tableProps = useDataTableQuery(`/api/gene/${geneId}/alleles`);
  const { data: resolvedData, totalRows, isLoading, supplementalData } = tableProps;

  // Filtered but not paginated list of alleles (used for viewer and category lookup)
  // Moved before useAlleleSelection so cached categories can be used
  const allelesFiltered = useAllVariants(geneId, tableProps.tableState);

  // Use custom hook for allele selection
  // Pass allelesFiltered so the hook can use cached categories instead of incorrect API alterationType
  const {
    alleleIdsSelected,
    setAlleleIdsSelected,
    selectionOverride,
    isLoadingSelectedAlleles,
    selectedAllelesData,
    selectedAllelesError,
    handleAllelesSelect,
    clearAlleleSelection,
  } = useAlleleSelection(tableProps, allelesFiltered?.data?.results);

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
  // TODO: Consider refactoring selection override logic to useReducer if it becomes more complex
  // This would provide better state management for related state variables
  const currentPage = selectionOverride.active ? overridePage : tableProps.tableState?.page || 1;
  const pageSize = selectionOverride.active ? overridePageSize : tableProps.tableState?.size || 10;

  // Custom table state handler for override mode
  const handleTableStateChange = useCallback(
    (newState) => {
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
    },
    [selectionOverride.active, overridePageSize, tableProps.setTableState]
  );

  const data = useMemo(() => {
    // Use selected alleles data when in override mode and data is available
    const baseData = selectionOverride.active && selectedAllelesData ? selectedAllelesData : resolvedData || [];

    let processedData = baseData.map((row) => ({
      ...row,
      id: getIdentifier(row.allele),
      allele: row.allele,
      synonyms: row.allele.alleleSynonyms,
      variantName: row.variants,
      variantConsequences: row.variants,
    }));

    // Filter to only show the selected alleles when in override mode
    if (selectionOverride.active && selectionOverride.alleleIds.length > 0) {
      processedData = processedData.filter((row) => selectionOverride.alleleIds.includes(row.id));

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
    let alleleIdsFiltered = selectionOverride.active ? selectedAllelesData : allelesFiltered.data?.results;
    alleleIdsFiltered = (alleleIdsFiltered || [])
      .filter((row) => {
        const category = row.category || row.alterationType;
        return category === ALLELE_WITH_ONE_VARIANT || category === ALLELE_WITH_MULTIPLE_VARIANTS;
      })
      .map((row) => row.id || getIdentifier(row.allele));

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
  }, [
    allelesFiltered.data,
    alleleIdsSelected,
    handleAllelesSelect,
    selectionOverride.active,
    selectedAllelesData,
    gene,
    geneLocation,
  ]);

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
      dataField: 'allele',
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
      formatter: (allele) => <AlleleCellCuration identifier={getIdentifier(allele)} allele={allele} />,
      headerStyle: { width: '185px' },
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'synonyms',
      text: 'Allele Synonyms',
      formatter: (synonyms) => <SynonymListCuration synonyms={synonyms} />,
      headerStyle: { width: '165px' },
      filterable: !selectionOverride.active,
    },
    {
      dataField: 'alterationType',
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
      headerStyle: { width: '160px' },
      filterable: selectionOverride.active ? false : getDistinctFieldValue(supplementalData, 'alleleCategory'),
      filterName: 'alleleCategory',
      filterType: 'checkbox',
    },
    {
      dataField: 'variantName',
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
          {variants?.map((variant) => {
            const loc = variant.curatedVariantGenomicLocations?.[0];
            const id = loc?.hgvs;
            const type = variant.variantType || {};
            const location = {
              chromosome: loc?.variantGenomicLocationAssociationObject?.name,
              start: loc?.start,
              end: loc?.end,
            };
            return (
              <div key={id}>
                <VariantJBrowseLink
                  geneLocation={geneLocation}
                  geneSymbol={geneSymbolText}
                  location={location}
                  species={speciesName}
                  type={type.name}
                  taxonid={taxonId}
                >
                  {id}
                </VariantJBrowseLink>
              </div>
            );
          })}
        </div>
      ),
      headerStyle: { width: variantNameColWidth },
      filterable: !selectionOverride.active,
      filterName: 'variant',
    },
    {
      dataField: 'variants',
      text: 'Variant type',
      formatter: (variants) => (
        <div>
          {variants?.map((variant) => {
            const id = variant.curatedVariantGenomicLocations?.[0]?.hgvs;
            const type = variant.variantType || {};
            return <div key={id}>{type?.name?.replace(/_/g, ' ')}</div>;
          })}
        </div>
      ),
      headerStyle: { width: variantTypeColWidth },
      filterable: selectionOverride.active ? false : getDistinctFieldValue(supplementalData, 'variantType'),
      filterName: 'variantType',
      filterType: 'checkbox',
    },
    {
      dataField: 'variantConsequences',
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
      formatter: (variants) => (
        <div>
          {variants?.map((variant) => {
            const loc = variant.curatedVariantGenomicLocations?.[0];
            const id = loc?.hgvs;
            const consequences =
              loc?.predictedVariantConsequences?.flatMap((c) => c.vepConsequences?.map((v) => v.name) || []) || [];
            return (
              <div key={id}>
                <CollapsibleList collapsedSize={1}>
                  {[...new Set(consequences.map((c) => c.replace(/_/g, ' ')))]}
                </CollapsibleList>
              </div>
            );
          })}
        </div>
      ),
      headerStyle: { width: variantConsequenceColWidth },
      filterable: selectionOverride.active ? false : getDistinctFieldValue(supplementalData, 'molecularConsequence'),
      filterName: 'molecularConsequence',
      filterType: 'checkbox',
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
    {
      value: 'alleleSymbol',
      label: 'Allele symbol',
    },
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
          {...(selectionOverride.active
            ? // When in override mode, spread tableProps but override specific properties
              {
                ...tableProps,
                tableState: {
                  ...tableProps.tableState,
                  page: overridePage,
                  sizePerPage: overridePageSize,
                  size: overridePageSize,
                },
                setTableState: handleTableStateChange,
              }
            : // When not in override mode, use tableProps as-is
              tableProps)}
          columns={columns}
          data={data}
          totalRows={selectionOverride.active ? selectedAllelesData?.length || 0 : totalRows}
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
