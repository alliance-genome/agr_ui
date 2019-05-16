import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAlleles } from '../../actions/genes';
import { selectAlleles } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
import ExternalLink from '../externalLink';
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

    const columns = [
      {
        dataField: 'symbol',
        text: 'Symbol',
        formatter: symbol => <span dangerouslySetInnerHTML={{ __html: symbol }} />,
        headerStyle: {width: '185px'},
        filterable: true,
        isKey: true,
      },
      {
        dataField: 'synonym',
        text: 'Synonyms',
        formatter: synonyms => <SynonymList synonyms={synonyms} />,
        headerStyle: {width: '200px'},
        filterable: true,
      },
      {
        dataField: 'source',
        text: 'Source',
        formatter: source => <ExternalLink href={source.url}>{source.dataProvider}</ExternalLink>,
        headerStyle: {width: '75px'},
        filterable: true,
      },
      {
        dataField: 'disease',
        text: 'Associated Human Disease',
        formatter: diseases => (
          <CollapsibleList collapsedSize={diseases.length}>
            {diseases.map(disease => <Link key={disease.id} to={`/disease/${disease.id}`}>{disease.name}</Link>)}
          </CollapsibleList>
        ),
        headerStyle: {width: '275px'},
        filterable: true,
      },
    ];

    const data = alleles.data
      .map(allele => ({
        symbol: allele.symbol,
        synonym: allele.synonyms,
        source: {
          dataProvider: geneDataProvider,
          url: allele.crossReferences.primary.url,
        },
        disease: allele.diseases.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
      }));

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/alleles/download`}
        keyField='symbol'
        loading={alleles.loading}
        onUpdate={this.loadData.bind(this)}
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
