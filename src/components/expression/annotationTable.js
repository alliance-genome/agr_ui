import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { selectAnnotations } from '../../selectors/expressionSelectors';
import { fetchExpressionAnnotations } from '../../actions/expression';
import { RemoteDataTable, ReferenceCell } from '../dataTable';

class AnnotationTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, genes, term } = this.props;
    if ((prevProps.term && term && term !== prevProps.term) || !isEqual(genes, prevProps.genes)) {
      this.tableRef.current && this.tableRef.current.reset();
      dispatch(fetchExpressionAnnotations(genes, term));
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

    const columns = [
      {
        field: 'key',
        isKey: true,
        hidden: true,
      },
      {
        field: 'species',
        label: 'Species',
        format: s => <i>{s}</i>,
      },
      {
        field: 'gene',
        label: 'Gene',
        format: g => <Link to={'/' + g.geneID}>{g.symbol}</Link>
      },
      {
        field: 'location',
        label: 'Location',
      },
      {
        field: 'stage',
        label: 'Stage',
      },
      {
        field: 'assay',
        label: 'Assay',
      },
      {
        field: 'source',
        label: 'Source',
      },
      {
        field: 'references',
        label: 'References',
        format: ReferenceCell
      }
    ];

    const data = annotations && annotations.data && annotations.data.results.map(result => ({
      key: `${result.gene.geneID}-${result.termName}-${result.stage ? result.stage.stageID : 'other'}`,
      species: result.gene.speciesName,
      gene: result.gene,
      location: result.termName,
      stage: result.stage && result.stage.name,
      assay: result.assay.name,
      source: result.dataProvider,
      references: result.publications,
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
