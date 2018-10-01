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
    if (term && ((prevProps.term && term !== prevProps.term) || !isEqual(genes, prevProps.genes))) {
      this.tableRef.current && this.tableRef.current.reset();
      dispatch(fetchExpressionAnnotations(genes, term));
    }
  }

  handleUpdate(opts) {
    const { dispatch, genes, term } = this.props;
    dispatch(fetchExpressionAnnotations(genes, term, opts));
  }

  render() {
    const { annotations, genes, term } = this.props;

    if (!term) {
      return null;
    }

    let columns = [
      {
        field: 'key',
        isKey: true,
        hidden: true,
      }
    ];

    if (genes.length > 1) {
      columns = columns.concat([
        {
          field: 'species',
          label: 'Species',
          format: s => <i>{s}</i>,
          filterable: true,
          width: '100px',
        },
        {
          field: 'gene',
          label: 'Gene',
          format: g => <Link to={'/' + g.geneID}>{g.symbol}</Link>,
          filterable: true,
          width: '75px',
        },
      ]);
    }

    columns = columns.concat([
      {
        field: 'location',
        label: 'Location',
        filterable: true,
        width: '150px',
      },
      {
        field: 'stage',
        label: 'Stage',
        filterable: true,
        width: '100px'
      },
      {
        field: 'assay',
        label: 'Assay',
        filterable: true,
        width: '150px',
      },
      {
        field: 'source',
        label: 'Source',
        filterable: true,
        width: '100px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        filterable: true,
        width: '150px',
      }
    ]);

    const data = annotations && annotations.data && annotations.data.results.map(result => ({
      key: `${result.gene.geneID}-${result.termName}-${result.stage ? result.stage.stageID : 'other'}`,
      species: result.gene.speciesName,
      gene: result.gene,
      location: result.termName,
      stage: result.stage && result.stage.name,
      assay: result.assay.name,
      source: result.dataProvider,
      reference: result.publications,
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
