/* eslint-disable react/no-set-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { fetchPhenotypes } from '../../actions/genes';
import { selectPhenotypes } from '../../selectors/geneSelectors';
import { RemoteDataTable, ReferenceCell, GeneticEntityCell } from '../../components/dataTable';

class PhenotypeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1,
      sort: {
        name: 'phenotype',
        order: 'asc',
      },
      filters: []
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.dispatchFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geneId !== prevProps.geneId || !isEqual(this.state, prevState)) {
      this.dispatchFetch();
    }
  }

  dispatchFetch() {
    const { dispatch, geneId } = this.props;
    const { page, limit, sort, filters } = this.state;
    dispatch(fetchPhenotypes(geneId, {limit, page, sort, filters}));
  }

  handleFilterChange(filter) {
    this.setState({filters: Object.keys(filter).map(key => ({name: key, value: filter[key].value}))});
  }

  handlePageChange(page) {
    this.setState({page});
  }

  handleSizeChange(limit) {
    this.setState({limit});
  }

  handleSortChange(name, order) {
    this.setState({sort: {name, order}});
  }

  render() {
    const { geneId, phenotypes } = this.props;
    const { page, limit, sort } = this.state;

    const data = phenotypes.data && phenotypes.data.map(record => {
      return {
        phenotype: record.phenotype,
        geneticEntity: record.featureDocument && {
          modCrossRefFullUrl: record.featureDocument.modCrossRefFullUrl,
          symbol: record.featureDocument.symbol,
        },
        geneticEntityType: record.featureDocument && record.featureDocument.category,
        reference: record.publications,
      };
    });

    const columns = [
      {
        field: 'id',
        isKey: true,
        hidden: true,
      },
      {
        field: 'phenotype',
        label: 'Phenotype Term',
        format: (term) => <span dangerouslySetInnerHTML={{__html: term}} />,
        sortable: true,
        filterable: true,
      },
      {
        field: 'geneticEntity',
        label: 'Genetic Entity',
        format: GeneticEntityCell,
        sortable: true,
        filterable: true,
        width: '185px',
      },
      {
        field: 'geneticEntityType',
        label: 'Genetic Entity Type',
        sortable: true,
        filterable: true,
        width: '100px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        sortable: true,
        filterable: true,
        width: '150px',
      },
    ];
    return (
      <RemoteDataTable
        columns={columns}
        currentPage={page}
        data={data}
        downloadUrl={`/api/gene/${geneId}/phenotypes/download`}
        onFilterChange={this.handleFilterChange}
        onPageChange={this.handlePageChange}
        onSizeChange={this.handleSizeChange}
        onSortChange={this.handleSortChange}
        perPageSize={limit}
        sortName={sort.name}
        sortOrder={sort.order}
        totalRows={phenotypes.total}
      />
    );
  }
}

PhenotypeTable.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  phenotypes: PropTypes.object,
};

function mapStateToProps (state) {
  return {
    phenotypes: selectPhenotypes(state),
  };
}

export default connect(mapStateToProps)(PhenotypeTable);
