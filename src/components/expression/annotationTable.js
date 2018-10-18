import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { selectAnnotations } from '../../selectors/expressionSelectors';
import { fetchExpressionAnnotations } from '../../actions/expression';
import { RemoteDataTable, ReferenceCell } from '../dataTable';
import CrossReferenceList from '../crossReferenceList';

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
        filterable: true,
        width: '100px',
        hidden: genes.length < 2,
      },
      {
        field: 'gene',
        label: 'Gene',
        format: g => <Link to={'/gene/' + g.geneID}>{g.symbol}</Link>,
        filterable: true,
        width: '75px',
        hidden: genes.length < 2,
      },
      {
        field: 'term',
        label: 'Location',
        filterable: true,
        width: '150px',
      },
      {
        field: 'stage',
        label: 'Stage',
        filterable: true,
        width: '130px'
      },
      {
        field: 'assay',
        label: 'Assay',
        format: a => <span title={a.name}>{a.displaySynonym}</span>,
        filterable: true,
        width: '150px',
      },
      {
        field: 'source',
        label: 'Source',
        filterable: true,
        format: refs => <CrossReferenceList collapsible={false} crossReferences={refs} />,
        width: '200px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        filterable: true,
        width: '150px',
      }
    ];

    const data = annotations && annotations.data && annotations.data.results.map(result => ({
      key: `${result.gene.geneID}-${result.termName}-${result.stage ? result.stage.stageID : 'other'}`,
      species: result.gene.speciesName,
      gene: result.gene,
      term: result.termName,
      stage: result.stage && result.stage.stageID,
      assay: result.assay,
      source: result.crossReferences,
      reference: result.publications,
    }));

    const geneIdParams = genes.map(g => `geneID=${g}`).join('&');
    const downloadUrl = `/api/expression/download?termID=${term}&${geneIdParams}`;
    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={downloadUrl}
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
