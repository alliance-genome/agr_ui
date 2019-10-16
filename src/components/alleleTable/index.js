import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAlleles } from '../../actions/geneActions';
import { selectAlleles } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { stringify as stringifyQuery } from 'query-string';
import { compareAlphabeticalCaseInsensitive } from '../../lib/utils';
import CollapsibleList from '../collapsibleList/collapsibleList';
import SynonymList from '../synonymList';
import { RemoteDataTable } from '../dataTable';
import ExternalLink from '../externalLink';
import DataSourceLink from '../dataSourceLink';

class AlleleTable extends Component {
  loadData (opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchAlleles(geneId, opts));
  }

  render() {
    const { alleles, geneId, geneSymbol, geneLocation = {}, species, geneDataProvider } = this.props;

    const variantNameColWidth = 300;
    const variantTypeColWidth = 150;
    const variantConsequenceColWidth = 150;

    const columns = [
      {
        dataField: 'symbol',
        text: 'Symbol',
        formatter: (symbol, {crossReferences = {}}) => (
          <DataSourceLink reference={crossReferences.primary}>
            <span dangerouslySetInnerHTML={{ __html: symbol }} />
          </DataSourceLink>
        ),
        headerStyle: {width: '125px'},
        filterable: true,
        isKey: true,
      },
      {
        dataField: 'synonym',
        text: 'Synonyms',
        formatter: synonyms => <SynonymList synonyms={synonyms} />,
        headerStyle: {width: '125px'},
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
            {diseases.map(disease => <Link key={disease.id} to={`/disease/${disease.id}`}>{disease.name}</Link>)}
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
        formatter: phenotypes => (
          <CollapsibleList collapsedSize={2}>
            {phenotypes.map(({phenotypeStatement}) => <span dangerouslySetInnerHTML={{__html: phenotypeStatement}} />)}
          </CollapsibleList>
        ),
        headerStyle: {width: '275px'},
        filterable: true,
        filterName: 'phenotype',
      },
      {
        dataField: 'variants',
        text: 'Variant',
        formatter: (variants) => (
          <div>
            {
              variants.map(({ id, type = {}, location = {}, consequence }) => (
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
                      location ?
                        <ExternalLink
                          href={`${process.env.JBROWSE_URL || ''}/jbrowse/?` + stringifyQuery({
                            data: `data/${species}`,
                            loc: (geneLocation && geneLocation.start && geneLocation.end) ?
                              `${geneLocation.chromosome || location.chromosome}:${geneLocation.start || 0}..${geneLocation.end || 0}` :
                              geneSymbol,
                            tracks: ['Phenotypic Variants', 'All Genes', 'DNA'].join(','),
                            highlight: `${location.chromosome}:${typeof location.start === 'number' ? location.start : location.end}..${location.end}`,
                          })}
                        >
                          {id}
                        </ExternalLink> : id
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
        filterable: true,
      },
      {
        dataField: 'variantConsequence',
        text: 'Molecular consequence',
        helpPopupProps: {
          id: 'gene-page--alleles-table--molecular-consequence-help',
          children: <span>Variant consequences were predicted by the <ExternalLink href="https://uswest.ensembl.org/info/docs/tools/vep/index.html" target="_blank">Ensembl Variant Effect Predictor (VEP) tool</ExternalLink> based on Alliance variants information.</span>,
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

    const sortOptions = null;
    // const sortOptions = [
    //   {
    //     value: 'disease',
    //     label: 'Associated Human Disease',
    //   }
    // ];

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

export default connect(mapStateToProps)(AlleleTable);
