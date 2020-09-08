import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {compareAlphabeticalCaseInsensitive} from '../../lib/utils';
import SynonymList from '../../components/synonymList';
import {
  AlleleCell,
  DataTable,
} from '../../components/dataTable';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import ExternalLink from '../../components/externalLink';
import {VariantJBrowseLink} from '../../components/variant';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell';
import VariantsSequenceViewer from './VariantsSequenceViewer';
import useDataTableQuery from '../../hooks/useDataTableQuery';

const AlleleTable = ({gene, geneId, geneSymbol, geneLocation = {}, species, geneDataProvider}) => {
  const {
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/gene/${geneId}/alleles`);

  const data = useMemo(() => {
    return resolvedData && resolvedData.results.map(allele => ({
      ...allele,
      symbol: allele.symbol,
      synonym: allele.synonyms,
      source: {
        dataProvider: geneDataProvider,
        url: allele.crossReferences.primary.url,
      },
      disease: allele.diseases.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
    }));
  }, [resolvedData]);

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);

  const variantsSequenceViewerProps = useMemo(() => {
    /*
       Warning!
       The data format here should be agreed upon by the maintainers of the VariantsSequenceViewer.
       Changes might break the VariantsSequenceViewer.
    */
    const formatAllele = alleleId => (
      {
        id: alleleId,
      }
    );
    return {
      allelesSelected: alleleIdsSelected.map(formatAllele),
      allelesVisible: data && data.map(({id}) => formatAllele(id)),
      onAllelesSelect: setAlleleIdsSelected,
      tableState: tableProps.tableState
    };
  }, [data, alleleIdsSelected, setAlleleIdsSelected, tableProps.tableState]);

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
      dataField: 'synonym',
      text: 'Allele Synonyms',
      formatter: synonyms => <SynonymList synonyms={synonyms}/>,
      headerStyle: {width: '165px'},
      filterable: true,
    },
    {
      dataField: 'category',
      text: 'Category',
      headerStyle: {width: '225px'},
      filterable: true,
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
                      geneSymbol={geneSymbol}
                      location={location}
                      species={species}
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
      filterable: getDistinctFieldValue(resolvedData, 'filter.variantConsequence'),
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
        width: '50px',
        height: '140px',
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
      value: 'variantConsequence',
      label: 'Molecular consequence',
    },
  ];

  return (
    <>
      <VariantsSequenceViewer
        alleles={data}
        gene={gene}
        genomeLocation={geneLocation}
        {...variantsSequenceViewerProps}
      />
      <DataTable
        {...tableProps}
        columns={columns}
        data={data}
        keyField='id'
        rowStyle={{cursor: 'pointer'}}
        selectRow={selectRow}
        sortOptions={sortOptions}
      />
    </>
  );
};

AlleleTable.propTypes = {
  gene: PropTypes.shape({
  }),
  geneDataProvider: PropTypes.string.isRequired,
  geneId: PropTypes.string.isRequired,
  geneLocation: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
  }),
  geneSymbol: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
};

export default AlleleTable;
