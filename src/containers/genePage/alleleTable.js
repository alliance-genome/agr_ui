import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {selectAlleles} from '../../selectors/geneSelectors';
import {connect} from 'react-redux';
import {compareAlphabeticalCaseInsensitive} from '../../lib/utils';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import SynonymList from '../../components/synonymList';
import {AlleleCell, RemoteDataTable} from '../../components/dataTable';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import ExternalLink from '../../components/externalLink';
import {fetchAlleles} from '../../actions/geneActions';
import DiseaseLink from '../../components/disease/DiseaseLink';
import {VariantJBrowseLink} from '../../components/variant';
import VariantsSequenceViewer from './VariantsSequenceViewer';


const AlleleTable = ({alleles, dispatchFetchAlleles, gene, geneId, geneSymbol, geneLocation = {}, species, geneDataProvider}) => {

  const variantNameColWidth = 300;
  const variantTypeColWidth = 110;
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
      text: 'Allele Symbol',
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
      dataField: 'disease',
      text: 'Associated Human Disease',
      helpPopupProps: {
        id: 'gene-page--alleles-table--disease-help',
        children: 'Associated human diseases shown in this table were independently annotated to the Alleles, and are not necessarily related to the phenotype annotations.'
      },
      formatter: diseases => (
        <CollapsibleList collapsedSize={2}>
          {diseases.map(disease => <DiseaseLink disease={disease} key={disease.id} />)}
        </CollapsibleList>
      ),
      headerStyle: {width: '150px'},
      filterable: true,
    },
    {
      dataField: 'phenotypes',
      text: 'Associated phenotypes',
      helpPopupProps: {
        id: 'gene-page--alleles-table--phenotype-help',
        children: 'Associated phenotypes shown in this table were independently annotated to the Alleles, and are are not necessarily related to the human disease annotations.'
      },
      formatter: phenotypes => phenotypes && (
        <CollapsibleList collapsedSize={2} showBullets>
          {phenotypes.map(({phenotypeStatement}) => (
            <span dangerouslySetInnerHTML={{__html: phenotypeStatement}} key={phenotypeStatement}/>
          ))}
        </CollapsibleList>
      ),
      headerStyle: {width: '200px'},
      filterable: true,
      filterName: 'phenotype',
    },
    {
      dataField: 'variants',
      text: 'Variant',
      formatter: (variants) => (
        <div>
          {
            variants.map(({id, type = {}, location = {}, consequence}) => (
              <div key={id} style={{display: 'flex'}}>
                <div
                  style={{
                    width: variantNameColWidth,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    paddingRight: 5,
                    flex: '1 0 auto',
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
                    flex: '1 0 auto',
                  }}
                >
                  {type && type.name && type.name.replace(/_/g, ' ')}
                </div>
                <div
                  style={{
                    width: variantConsequenceColWidth,
                    flex: '1 0 auto',
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
      // filterable: ['delins', 'point mutation', 'insertion', 'deletion', 'MNV'],
      filterable: alleles.supplementalData && alleles.supplementalData.distinctFieldValues ?
        getDistinctFieldValue(alleles, 'filter.variantType') :
        true,
    },
    {
      dataField: 'variantConsequence',
      text: 'Molecular consequence',
      helpPopupProps: {
        id: 'gene-page--alleles-table--molecular-consequence-help',
        children: <span>Variant consequences were predicted by the <ExternalLink href="https://uswest.ensembl.org/info/docs/tools/vep/index.html" target="_blank">Ensembl Variant Effect Predictor (VEP) tool</ExternalLink> based on Alliance variants information.</span>,
      },
      headerStyle: {width: variantConsequenceColWidth},
      filterable: alleles.supplementalData && alleles.supplementalData.distinctFieldValues ?
        getDistinctFieldValue(alleles, 'filter.variantConsequence') :
        true,
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

  const data = useMemo(() => {
    return alleles.data.map(allele => ({
      ...allele,
      symbol: allele.symbol,
      synonym: allele.synonyms,
      source: {
        dataProvider: geneDataProvider,
        url: allele.crossReferences.primary.url,
      },
      disease: allele.diseases.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
    }));
  }, [alleles]);

  const [observedTableOpts, setObservedTableOpts] = useState({});

  const handleTableUpdate = useCallback(
    (opts) => {
      setObservedTableOpts(opts);
      dispatchFetchAlleles(opts);
    },
    [dispatchFetchAlleles, setObservedTableOpts]
  );

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
      allelesVisible: data.map(({id}) => formatAllele(id)),
      onAllelesSelect: setAlleleIdsSelected,
      observedTableOpts,
    };
  }, [data, alleleIdsSelected, setAlleleIdsSelected, observedTableOpts]);

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

  return (
    <>
      <VariantsSequenceViewer
        gene={gene}
        genomeLocation={geneLocation}
        {...variantsSequenceViewerProps}
      />
      <RemoteDataTable
        columns={columns}
        data={data}
        key={geneId}
        keyField='id'
        loading={alleles.loading}
        onUpdate={handleTableUpdate}
        rowStyle={{cursor: 'pointer'}}
        selectRow={selectRow}
        sortOptions={sortOptions}
        totalRows={alleles.total}
      />
    </>
  );
};

AlleleTable.propTypes = {
  alleles: PropTypes.object,
  dispatchFetchAlleles: PropTypes.func,
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

const mapStateToProps = state => ({
  alleles: selectAlleles(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchFetchAlleles: (opts) => dispatch(fetchAlleles(props.geneId, opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlleleTable);
