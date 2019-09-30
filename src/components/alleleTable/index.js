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
import ExternalLink from '../externalLink';

class AlleleTable extends Component {
  loadData (opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchAlleles(geneId, opts));
  }

  render() {
    const { alleles, geneId, geneSymbol, species, geneDataProvider } = this.props;

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
              variants.map(({ id, type = {}, location = {}, consequence }) => (
                <div key={id} style={{display: 'flex'}}>
                  <div
                    style={{
                      width: variantNameColWidth,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      padding: `0px ${5}px`,
                      flex: '1 0 auto',
                    }}
                  >
                    <ExternalLink href={`${process.env.JBROWSE_URL || ''}/jbrowse/?data=data/${species}&&loc=${geneSymbol}&tracks=Phenotypic Variants,All Genes,DNA&highlight=${location.chromosome}:${location.start || location.end}..${location.end}`}>
                      {id}
                    </ExternalLink>
                  </div>
                  <div
                    style={{
                      width: variantTypeColWidth,
                      padding: `0px ${5}px`,
                      flex: '1 0 auto',
                    }}
                  >
                    {type && type.name && type.name.replace(/_/g, ' ')}
                  </div>
                  <div
                    style={{
                      width: variantConsequenceColWidth,
                      padding: `0px ${5}px`,
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
  geneSymbol: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  alleles: selectAlleles(state),
});

export default connect(mapStateToProps)(AlleleTable);
