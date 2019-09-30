import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAlleles } from '../../actions/genes';
import { selectAlleles } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
// import ExternalLink from '../externalLink';
import { Link } from 'react-router-dom';
import { compareAlphabeticalCaseInsensitive } from '../../lib/utils';
import CollapsibleList from '../collapsibleList/collapsibleList';
import SynonymList from '../synonymList';
import { RemoteDataTable } from '../dataTable';

class AlleleTable extends Component {
  loadData (opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchAlleles(geneId, opts));
  }

  render() {
    const { alleles, geneId, geneDataProvider } = this.props;

    const variantNameColWidth = 300;
    const variantTypeColWidth = 150;
    const variantConsequenceColWidth = 150;

    const columns = [
      {
        dataField: 'symbol',
        text: 'Symbol',
        formatter: symbol => <span dangerouslySetInnerHTML={{ __html: symbol }} />,
        headerStyle: {width: '85px'},
        filterable: true,
        isKey: true,
      },
      {
        dataField: 'synonym',
        text: 'Synonyms',
        formatter: synonyms => <SynonymList synonyms={synonyms} />,
        headerStyle: {width: '120px'},
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
          <CollapsibleList collapsedSize={diseases.length}>
            {diseases.map(disease => <Link key={disease.id} to={`/disease/${disease.id}`}>{disease.name}</Link>)}
          </CollapsibleList>
        ),
        headerStyle: {width: '250px'},
        filterable: true,
      },
      {
        dataField: 'phenotypes',
        text: 'Associated phenotype',
        helpPopupProps: {
          id: 'gene-page--alleles-table--phenotype-help',
          children: 'Associated phenotypes shown in this table were independently annotated to the Alleles, and are are not necessarily related to the human disease annotations.'
        },
        formatter: phenotypes => (
          <CollapsibleList collapsedSize={2}>
            {phenotypes.map(({phenotypeStatement}) => phenotypeStatement)}
          </CollapsibleList>
        ),
        headerStyle: {width: '225px'},
      },
      {
        dataField: 'variants',
        text: 'Variant',
        formatter: (variants) => (
          <div>
            {
              variants.map((variant) => (
                <div key={variant.id} style={{display: 'flex'}}>
                  <div
                    style={{
                      width: variantNameColWidth,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      padding: `0px ${5}px`,
                      flex: '1 0 auto',
                    }}
                  >
                    {variant.id}
                  </div>
                  <div
                    style={{
                      width: variantTypeColWidth,
                      padding: `0px ${5}px`,
                      flex: '1 0 auto',
                    }}
                  >
                    {variant.type && variant.type.name}
                  </div>
                  <div
                    style={{
                      width: variantConsequenceColWidth,
                      padding: `0px ${5}px`,
                      flex: '1 0 auto',
                    }}
                  >
                    N/A
                  </div>
                </div>
              ))
            }
          </div>
        ),
        attrs: {
          colspan: 3
        },
        headerStyle: {width: variantNameColWidth},
        //style: {width: variantNameColWidth + variantTypeColWidth + variantConsequenceColWidth + 50},
        filterable: false,
      },
      {
        dataField: 'variantType',
        text: 'Variant type',
        headerStyle: {width: variantTypeColWidth},
        filterable: true,
      },
      {
        dataField: 'molecularConsequence',
        text: 'Molecular consequence',
        helpPopupProps: {
          id: 'gene-page--alleles-table--molecular-consequence-help',
          children: <span>Variant consequences were predicted by the <a href="https://uswest.ensembl.org/info/docs/tools/vep/index.html" target="_blank">Ensembl Variant Effect Predictor (VEP) tool</a> based on Alliance variants information.</span>,
        },
        headerStyle: {width: variantConsequenceColWidth},
        filterable: true,
      },
      // {
      //   dataField: 'source',
      //   text: 'Source',
      //   formatter: source => <ExternalLink href={source.url}>{source.dataProvider}</ExternalLink>,
      //   filterable: true,
      // },
    ];

    const data = alleles.data
      .map(allele => ({
        ...allele,
        symbol: allele.symbol,
        synonym: allele.synonyms,
        source: {
          dataProvider: geneDataProvider,
          url: allele.crossReferences.primary.url,
        },
        disease: allele.diseases.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
      }));

    const sortOptions = [
      {
        value: 'disease',
        label: 'Associated Human Disease',
      }
    ];

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/alleles/download`}
        keyField='symbol'
        loading={alleles.loading}
        onUpdate={this.loadData.bind(this)}
        sortOptions={sortOptions}
        totalRows={alleles.total}
      />
    );
  }
}

AlleleTable.propTypes = {
  alleles: PropTypes.object,
  dispatch: PropTypes.func,
  geneDataProvider: PropTypes.string.isRequired,
  geneId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  alleles: selectAlleles(state),
});

export default connect(mapStateToProps)(AlleleTable);
