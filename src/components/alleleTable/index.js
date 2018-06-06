import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAlleles } from '../../actions/genes';
import { selectAlleles } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
import LocalDataTable from '../dataTable/localDataTable';
import ExternalLink from '../externalLink';
import CommaSeparatedList from '../commaSeparatedList';
import { Link } from 'react-router-dom';
import { compareAlphabeticalCaseInsensitive } from '../../lib/utils';

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
    const columns = [
      {
        field: 'symbol',
        label: 'Symbol',
        format: symbol => <span dangerouslySetInnerHTML={{ __html: symbol }} />,
        width: '185px',
        sortable: true,
        filterable: true,
        isKey: true,
      },
      {
        field: 'synonyms',
        label: 'Synonyms',
        width: '185px',
        sortable: true,
        filterable: true,
      },
      {
        field: 'source',
        label: 'Source',
        format: source => <ExternalLink href={source.url}>{source.dataProvider}</ExternalLink>,
        asText: source => source.url,
        width: '75px',
        sortable: true,
        filterable: true,
      },
      {
        field: 'diseases',
        label: 'Associated Human Disease',
        format: diseases => (
          diseases && <CommaSeparatedList>
            {diseases.map(disease => <Link key={disease.id} to={`/disease/${disease.id}`}>{disease.name}</Link>)}
          </CommaSeparatedList>
        ),
        asText: diseases => diseases
          .map(disease => `${disease.name} [${disease.id}]`)
          .join(', '),
        width: '290px',
        sortable: true,
        filterable: true,
      },
    ];

    const data = alleles.map(allele => ({
      symbol: allele.symbol,
      synonyms: allele.synonyms,
      source: {
        dataProvider: geneDataProvider,
        url: allele.modCrossRefFullUrl,
      },
      diseases: allele.diseaseDocuments
        .map(disease => ({
          id: disease.doId,
          name: disease.name,
        }))
        .sort(compareAlphabeticalCaseInsensitive(disease => disease.name))
    }));

    return <LocalDataTable columns={columns} data={data} filename={filename} paginated />;
  }
}

AlleleTable.propTypes = {
  alleles: PropTypes.array,
  dispatch: PropTypes.func,
  filename: PropTypes.string.isRequired,
  geneDataProvider: PropTypes.string.isRequired,
  geneId: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
  return {
    alleles: selectAlleles(state)
  };
}

export default connect(mapStateToProps)(AlleleTable);
