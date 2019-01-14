import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAlleles } from '../../actions/genes';
import { selectAlleles } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
import LocalDataTable from '../dataTable/localDataTable';
import ExternalLink from '../externalLink';
import { Link } from 'react-router-dom';
import { compareAlphabeticalCaseInsensitive, stripHtml } from '../../lib/utils';
import CollapsibleList from '../collapsibleList/collapsibleList';
import SynonymList from '../synonymList';
import NoData from '../noData';
import LoadingSpinner from '../loadingSpinner';

class AlleleTable extends Component {
  componentDidMount () {
    const { dispatch, geneId } = this.props;
    dispatch(fetchAlleles(geneId));
  }

  componentDidUpdate (prevProps) {
    const { dispatch, geneId } = this.props;
    if (geneId !== prevProps.geneId) {
      dispatch(fetchAlleles(geneId));
    }
  }

  render() {
    const { alleles, filename, geneDataProvider } = this.props;

    if (alleles.loading) {
      return <LoadingSpinner />;
    }

    if (alleles.data.length === 0) {
      return <NoData />;
    }

    const columns = [
      {
        field: 'symbol',
        label: 'Symbol',
        format: symbol => <span dangerouslySetInnerHTML={{ __html: symbol }} />,
        width: '185px',
        sortable: true,
        filterable: true,
        filterText: symbol => stripHtml(symbol),
        isKey: true,
      },
      {
        field: 'synonyms',
        label: 'Synonyms',
        format: synonyms => <SynonymList synonyms={synonyms} />,
        width: '200px',
        sortable: true,
        filterable: true,
        filterText: synonyms => synonyms.map(s => stripHtml(s)).join(' '),
      },
      {
        field: 'source',
        label: 'Source',
        format: source => <ExternalLink href={source.url}>{source.dataProvider}</ExternalLink>,
        asText: source => source.url,
        width: '75px',
        sortable: true,
        filterable: true,
        filterText: source => source.dataProvider
      },
      {
        field: 'diseases',
        label: 'Associated Human Disease',
        format: diseases => (
          <CollapsibleList collapsedSize={diseases.length}>
            {diseases.map(disease => <Link key={disease.id} to={`/disease/${disease.id}`}>{disease.name}</Link>)}
          </CollapsibleList>
        ),
        asText: diseases => diseases
          .map(disease => `${disease.name} [${disease.id}]`)
          .join(', '),
        width: '275px',
        sortable: true,
        filterable: true,
        filterText: diseases => diseases.map(d => d.name).join(' '),
      },
    ];

    const data = alleles.data
      .map(allele => ({
        symbol: allele.symbol,
        synonyms: allele.synonyms,
        source: {
          dataProvider: geneDataProvider,
          url: allele.crossReferences.primary.url,
        },
        diseases: allele.diseases.sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
      }))
      .sort(compareAlphabeticalCaseInsensitive(allele => allele.symbol));

    return <LocalDataTable columns={columns} data={data} filename={filename} paginated />;
  }
}

AlleleTable.propTypes = {
  alleles: PropTypes.object,
  dispatch: PropTypes.func,
  filename: PropTypes.string.isRequired,
  geneDataProvider: PropTypes.string.isRequired,
  geneId: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
  return {
    alleles: selectAlleles(state),
  };
}

export default connect(mapStateToProps)(AlleleTable);
