import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {compareAlphabeticalCaseInsensitive, getSingleGenomeLocation, findFminFmax} from '../../lib/utils';
import SynonymList from '../../components/synonymList.jsx';
import {
  AlleleCell,
  DataTable,
} from '../../components/dataTable';
import NoData from '../../components/noData.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import ExternalLink from '../../components/ExternalLink.jsx';
import {VariantJBrowseLink} from '../../components/variant';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell.jsx';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell.jsx';
import VariantsSequenceViewer from './VariantsSequenceViewer.jsx';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import useAllVariants from '../../hooks/useAllVariants';

const AlleleTable = ({ isLoadingGene, gene, geneId}) => {
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);

  const tableProps = useDataTableQuery(`/api/gene/${geneId}/alleles`);
  const {
    data: resolvedData,
    totalRows,
    isLoading,
  } = tableProps;

  const data = useMemo(() => {
    return (resolvedData || []).map(allele => ({
      ...allele,
      symbol: allele.symbol,
      synonym: allele.synonyms,
      source: {
        dataProvider: gene.dataProvider,
        url: allele.crossReferenceMap.primary.url,
      },
      disease: allele.diseases?.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedData]);

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);

  const hasAlleles = totalRows > 0;
  const hasManyAlleles = totalRows > 20000;

  // filtered but not paginate list of alleles
  const allelesFiltered = useAllVariants(geneId, tableProps.tableState);

  const variantsSequenceViewerProps = useMemo(() => {
    const variantsFiltered = (allelesFiltered.data && allelesFiltered.data.results) ? allelesFiltered.data.results.flatMap(
      allele => (allele && allele.variants) || []
    ) : [];
    const variantLocations = variantsFiltered.map(variant => variant && variant.location);
    const { fmin, fmax } = findFminFmax([geneLocation, ...variantLocations]);
    const alleleIdsFiltered = (allelesFiltered.data && allelesFiltered.data.results) ? allelesFiltered.data.results.map(allele => (allele.id)) : [];

    /*
       Warning!
       The data format here should be agreed upon by the maintainers of the VariantsSequenceViewer.
       Changes might break the VariantsSequenceViewer.
    */
    const formatAllele = (alleleId) => (
      {
        id: alleleId,
      }
    );
    return {
      gene: gene,
      fmin: fmin,
      fmax: fmax,
      hasVariants: Boolean(variantsFiltered && variantsFiltered.length),
      allelesSelected: alleleIdsSelected.map(formatAllele),
      allelesVisible: alleleIdsFiltered.map(formatAllele),
      onAllelesSelect: setAlleleIdsSelected,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedData, allelesFiltered.data, alleleIdsSelected, setAlleleIdsSelected]);

  const selectRow = useMemo(() => ({
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectColumn: true,
    selected: alleleIdsSelected,
    onSelect: (row) => {
      const alleleIdRow = row.id;
      setAlleleIdsSelected(alleleIdsSelectedPrev => {
        if (alleleIdsSelectedPrev.includes(alleleIdRow)) {
          const indexAlleleId = alleleIdsSelectedPrev.indexOf(alleleIdRow);
          return [
            ...alleleIdsSelectedPrev.slice(0, indexAlleleId),
            ...alleleIdsSelectedPrev.slice(indexAlleleId + 1)
          ];
        } else {
          return [...alleleIdsSelectedPrev, alleleIdRow];
        }
      });
    },
    style: { backgroundColor: '#ffffd4' },
  }), [alleleIdsSelected, setAlleleIdsSelected]);

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
        children: <span>Organism specific official nomenclature for the allele or  <ExternalLink href="https://varnomen.hgvs.org/recommendations/general/" target="_blank">HGVS</ExternalLink> (Human Genome Variation Society) based nomenclature for the variants.</span>,
      },
      formatter: (_, allele) => <AlleleCell allele={allele} />,
      headerStyle: {width: '185px'},
      filterable: true,
    },
    {
      dataField: 'synonyms',
      text: 'Allele Synonyms',
      formatter: synonyms => <SynonymList synonyms={synonyms}/>,
      headerStyle: {width: '165px'},
      filterable: true,
    },
    {
      dataField: 'category',
      text: 'Category',
      helpPopupProps: {
        id: 'gene-page--alleles-table--allele-category-help',
        children: <span>An indication of whether the referenced object is an allele where the genomic location of the nucleotide change in not known (“allele”), an allele where one or more genomic locations of nucleotide change(s) are known (“allele with N associated variant(s)”), or a variant, i.e., a specific nucleotide change at a specified location on the genome (“variant”).</span>,
      },
      headerStyle: {width: '140px'},
      filterName: 'alleleCategory',
      filterType: 'checkbox',
      filterable: true,
    },
    {
      dataField: 'variants',
      text: 'Variant',
      helpPopupProps: {
        id: 'gene-page--alleles-table--allele-variant-help',
        children: <span>A unique identifier consisting of the <ExternalLink href="https://varnomen.hgvs.org/recommendations/general/" target="_blank">HGVS nomenclature</ExternalLink> or reference <ExternalLink href="https://www.ncbi.nlm.nih.gov/snp/docs/RefSNP_about/" target="_blank">SNP (rs) ID</ExternalLink> for the variant. Identifiers in this column link to the Alliance JBrowse for this species.</span>,
      },
      formatter: (variants) => (
        <div>
          {
            variants?.map(({id, variantType: type = {}, location = {}, transcriptLevelConsequence}) => (
              <div key={id} style={{display: 'flex'}}>
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
                    >{id}</VariantJBrowseLink>
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
                    {[...new Set(transcriptLevelConsequence && transcriptLevelConsequence.flatMap(
                      ({molecularConsequences}) => molecularConsequences
                    ).map(c => c.replace(/_/g, ' ')))]}
                  </CollapsibleList>
                </div>
              </div>
            ))
          }
        </div>
      ),
      attrs: {
        colSpan: 3
      },
      headerStyle: {width: variantNameColWidth},
      //style: {width: variantNameColWidth + variantTypeColWidth + variantConsequenceColWidth + 50},
      filterable: false,
    },
    {
      dataField: 'variantType',
      text: 'Variant type',
      headerStyle: {width: variantTypeColWidth},
      style: {
        display: 'none',
      },
      filterType: 'checkbox',
      filterable: true,
    },
    {
      dataField: 'variants.transcriptLevelConsequence',
      text: 'Molecular consequence',
      helpPopupProps: {
        id: 'gene-page--alleles-table--molecular-consequence-help',
        children: <span>Variant consequences were predicted by the <ExternalLink href="https://www.ensembl.org/info/docs/tools/vep/index.html" target="_blank">Ensembl Variant Effect Predictor (VEP) tool</ExternalLink> based on Alliance variants information.
          Examples are: frameshift variant, stop gained, missense variant, splice donor variant, splice acceptor variant, stop gained, splice region variant, intron variant, coding sequence variant, 5 prime UTR variant, and inframe deletion.</span>,
      },
      headerStyle: {width: variantConsequenceColWidth},
      style: {
        display: 'none',
      },
      filterName: 'molecularConsequence',
      filterType: 'checkbox',
      filterable: true,
    },
    {
      dataField: 'hasDisease',
      text: 'Has Disease Annotations',
      formatter: (hasDisease, allele) => (
        <BooleanLinkCell
          to={`/allele/${allele.id}#disease-associations`}
          value={hasDisease}
        />
      ),
      headerNode: <RotatedHeaderCell>Has Disease Annotations</RotatedHeaderCell>,
      headerStyle: {
        paddingLeft: 0,
        width: '50px',
        height: '130px',
      },
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
    },
    {
      dataField: 'hasPhenotype',
      text: 'Has Phenotype Annotations',
      formatter: (hasPhenotype, allele) => (
        <BooleanLinkCell
          to={`/allele/${allele.id}#phenotypes`}
          value={hasPhenotype}
        />
      ),
      headerNode: <RotatedHeaderCell>Has Phenotype Annotations</RotatedHeaderCell>,
      headerStyle: {
        paddingLeft: 0,
        width: '115px', // wider because this one is on the end!
        height: '145px',
      },
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
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
        isLoading || isLoadingGene ?
          null :
          variantsSequenceViewerProps.hasVariants ?
            <VariantsSequenceViewer {...variantsSequenceViewerProps} /> :
            hasAlleles ?
              <NoData>No mapped variant information available</NoData> :
              null /* in this case, the whole section is empty, and default no data message kicks in */
      }
      <div className="position-relative">
        <DataTable
          {...tableProps}
          columns={columns}
          data={data}
          downloadUrl={`/api/gene/${geneId}/alleles/download`}
          keyField='id'
          rowStyle={{cursor: 'pointer'}}
          selectRow={selectRow}
          sortOptions={sortOptions}
        />
        <div className="d-flex flex-column align-items-start my-2 mx-auto">
          {
            hasAlleles ?
              <div className="d-flex flex-row align-items-center justify-content-start">
                <Link
                  className={'btn btn-primary ' + (hasManyAlleles ? 'disabled' : '')}
                  to={`/gene/${geneId}/allele-details`}
                >View detailed Alleles/Variants information</Link>
                {
                  hasManyAlleles ?
                    <NoData>
                      <div className="ml-2">
                        Detailed information is disabled due to large number of variants.
                        <br />
                        Please use the download link below to retrieve details for all gene alleles/variants.
                      </div>
                    </NoData> : null
                }
              </div> :
              null
          }
          <Link className="btn btn-link" to={'/downloads#variants-alleles'}>Download all Alleles/Variants for all genes of the species</Link>
        </div>
      </div>
    </>
  );
};

AlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default AlleleTable;
