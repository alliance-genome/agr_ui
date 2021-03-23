import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {compareAlphabeticalCaseInsensitive, getSingleGenomeLocation, findFminFmax} from '../../lib/utils';
import SynonymList from '../../components/synonymList';
import {
  AlleleCell,
  DataTable,
} from '../../components/dataTable';
import NoData from '../../components/noData';
import {getDistinctFieldValue, } from '../../components/dataTable/utils';
import ExternalLink from '../../components/ExternalLink';
import {VariantJBrowseLink} from '../../components/variant';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell';
import VariantsSequenceViewer from './VariantsSequenceViewer';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';

const AlleleTable = ({geneId}) => {

  const { isLoading: isLoadingGene, isError: isErrorGene, data: gene } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene || isErrorGene) {
    return null;
  }
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);

  const tableProps = useDataTableQuery(`/api/gene/${geneId}/alleles`);
  const {
    resolvedData,
    isLoading,
  } = tableProps;

  const data = useMemo(() => {
    return resolvedData && resolvedData.results.map(allele => ({
      ...allele,
      symbol: allele.symbol,
      synonym: allele.synonyms,
      source: {
        dataProvider: gene.dataProvider,
        url: allele.crossReferences.primary.url,
      },
      disease: allele.diseases.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
    }));
  }, [resolvedData]);

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);
  const variants = useMemo(() => (
    resolvedData ?
      resolvedData.results.flatMap(
        allele => (allele && allele.variants) || []
      ) :
      []
  ), [resolvedData]);
  const variantsSequenceViewerProps = useMemo(() => {
    const variantLocations = variants.map(variant => variant && variant.location);
    const { fmin, fmax } = findFminFmax([geneLocation, ...variantLocations]);

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
      hasVariants: Boolean(variants && variants.length),
      allelesSelected: alleleIdsSelected.map(formatAllele),
      allelesVisible: resolvedData ? resolvedData.results.map(allele => formatAllele(allele && allele.id)) : [],
      onAllelesSelect: setAlleleIdsSelected,
    };
  }, [resolvedData, variants, alleleIdsSelected, setAlleleIdsSelected]);

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
      headerStyle: {width: '140px'},
      filterName: 'alleleCategory',
      filterable: getDistinctFieldValue(resolvedData, 'filter.alleleCategory'),
    },
    {
      dataField: 'variants',
      text: 'Variant',
      formatter: (variants) => (
        <div>
          {
            variants.map(({id, variantType: type = {}, location = {}, consequence}) => (
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
                  {consequence && consequence.replace(/_/g, ' ')}
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
      // filterable: ['delins', 'point mutation', 'insertion', 'deletion', 'MNV'],
      filterable: getDistinctFieldValue(resolvedData, 'filter.variantType'),
    },
    {
      dataField: 'variantConsequence',
      text: 'Molecular consequence',
      helpPopupProps: {
        id: 'gene-page--alleles-table--molecular-consequence-help',
        children: <span>Variant consequences were predicted by the <ExternalLink href="https://uswest.ensembl.org/info/docs/tools/vep/index.html" target="_blank">Ensembl Variant Effect Predictor (VEP) tool</ExternalLink> based on Alliance variants information.</span>,
      },
      headerStyle: {width: variantConsequenceColWidth},
      style: {
        display: 'none',
      },
      filterable: getDistinctFieldValue(resolvedData, 'filter.molecularConsequence'),
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
      value: 'disease',
      label: 'Associated Human Disease',
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
        isLoading || isLoadingGene ?
          null :
          variantsSequenceViewerProps.hasVariants ?
            <VariantsSequenceViewer {...variantsSequenceViewerProps} /> :
            <NoData>No mapped variant information available</NoData>
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
        <Link className="btn btn-primary position-absolute d-block" style={{top: '2em'}} to={`/gene/${geneId}/allele-details`}>View all Alleles and Variants information</Link>
      </div>
    </>
  );
};

AlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default AlleleTable;
