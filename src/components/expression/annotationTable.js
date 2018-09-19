import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectAnnotations } from '../../selectors/expressionSelectors';
import { fetchExpressionAnnotations } from '../../actions/expression';
import { RemoteDataTable } from '../dataTable';

const columns = [
  {
    field: 'key',
    isKey: true,
    hidden: true,
  },
  {
    field: 'species',
    label: 'Species',
  },
  {
    field: 'gene',
    label: 'Gene',
  },
  {
    field: 'location',
    label: 'Location',
  },
  {
    field: 'stage',
    label: 'Stage',
  }
];

class AnnotationTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, genes, term } = this.props;
    if (term !== prevProps.term) {
      this.tableRef.current.reset();
      dispatch(fetchExpressionAnnotations(genes, term, {page: 1}));
    }
  }

  handleUpdate(opts) {
    const { dispatch, genes, term } = this.props;
    dispatch(fetchExpressionAnnotations(genes, term, opts));
  }

  render() {
    const { annotations, term } = this.props;

    if (!term) {
      return null;
    }

    const data = annotations && annotations.data && annotations.data.results.map(result => ({
      key: `${result.gene.geneID}-${result.termName}-${result.stage.stageID}`,
      species: result.gene.speciesName,
      gene: result.gene.symbol,
      location: result.termName,
      stage: result.stage.name,
    }));
    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        loading={annotations.loading}
        onUpdate={this.handleUpdate}
        ref={this.tableRef}
        totalRows={annotations.data ? annotations.data.total : 0}
      />
    );
  }
}

AnnotationTable.propTypes = {
  annotations: PropTypes.object,
  dispatch: PropTypes.func,
  genes: PropTypes.array,
  term: PropTypes.string,
};

const mapStateToProps = state => ({
  annotations: selectAnnotations(state),
});

export default connect(mapStateToProps)(AnnotationTable);
