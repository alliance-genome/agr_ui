import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import hash from 'object-hash';

import { selectAnnotations } from '../../selectors/expressionSelectors';
import { fetchExpressionAnnotations } from '../../actions/expression';
import { RemoteDataTable, ReferenceCell, GeneCell } from '../dataTable';
import DataSourceLink from '../dataSourceLink';
import CommaSeparatedList from '../commaSeparatedList';
import {
  compareAlphabeticalCaseInsensitive,
  compareByFixedOrder
} from '../../lib/utils';
import {getDistinctFieldValue} from '../dataTable/utils';
import {SPECIES_NAME_ORDER} from '../../constants';

class ExpressionAnnotationTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, genes, term } = this.props;
    if (term !== undefined && ((prevProps.term !== undefined && term !== prevProps.term) || !isEqual(genes, prevProps.genes))) {
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

    if (term === undefined) {
      return null;
    }

    const columns = [
      {
        dataField: 'key',
        text: 'key',
        hidden: true,
      },
      {
        dataField: 'species',
        text: 'Species',
        formatter: s => <i>{s}</i>,
        filterable: getDistinctFieldValue(annotations, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
        filterLabelClassName: 'species-name',
        headerStyle: {width: '100px'},
        hidden: genes.length < 2,
      },
      {
        dataField: 'gene',
        text: 'Gene',
        formatter: GeneCell,
        filterable: true,
        headerStyle: {width: '120px'},
        hidden: genes.length < 2,
      },
      {
        dataField: 'term',
        text: 'Location',
        filterable: true,
        headerStyle: {width: '150px'},
      },
      {
        dataField: 'stage',
        text: 'Stage',
        filterable: true,
        headerStyle: {width: '130px'},
      },
      {
        dataField: 'assay',
        text: 'Assay',
        formatter: a => <span title={a.name}>{a.displaySynonym}</span>,
        filterable: true,
        headerStyle: {width: '150px'},
      },
      {
        dataField: 'source',
        text: 'Source',
        filterable: true,
        formatter: refs => refs && (
          <CommaSeparatedList>
            {refs
              .sort(compareAlphabeticalCaseInsensitive(ref => ref.name))
              .map(ref => <DataSourceLink key={ref.name} reference={ref} />)}
          </CommaSeparatedList>
        ),
        headerStyle: {width: '200px'},
      },
      {
        dataField: 'reference',
        text: 'References',
        formatter: ReferenceCell,
        filterable: true,
        headerStyle: {width: '150px'},
      }
    ];


    const data = annotations && annotations.data && annotations.data.map(result => ({
      key: hash(result),
      species: result.gene.species.name,
      gene: result.gene,
      term: result.termName,
      stage: result.stage && result.stage.stageID,
      assay: result.assay,
      source: result ? result.crossReferences: null,
      reference: result.publications,
    }));

    const params = genes.map(g => ({name: 'geneID', value: g}))
      .concat({name: 'termID', value: term === 'all' ? '' : term})
      .filter(p => !!p.value)
      .map(p => `${p.name}=${p.value}`)
      .join('&');
    const downloadUrl = `/api/expression/download?${params}`;
    const sortOptions = [
      {
        value: 'species',
        label: 'Species',
      },
      {
        value: 'location',
        label: 'Location',
      },
      {
        value: 'assay',
        label: 'Assay',
      },
      {
        value: 'stage',
        label: 'Stage',
      },
      {
        value: 'gene',
        label: 'Gene',
      },
    ];

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={downloadUrl}
        keyField='key'
        loading={annotations.loading}
        onUpdate={this.handleUpdate}
        ref={this.tableRef}
        sortOptions={sortOptions}
        totalRows={annotations.total}
      />
    );
  }
}

ExpressionAnnotationTable.propTypes = {
  annotations: PropTypes.object,
  dispatch: PropTypes.func,
  genes: PropTypes.array,
  term: PropTypes.string,
};

const mapStateToProps = state => ({
  annotations: selectAnnotations(state),
});

export default connect(mapStateToProps)(ExpressionAnnotationTable);
