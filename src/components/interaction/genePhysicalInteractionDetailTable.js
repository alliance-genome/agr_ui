import React from 'react';
import PropTypes from 'prop-types';
import {
  GeneCell,
  RemoteDataTable,
} from '../dataTable';
import CommaSeparatedList from '../commaSeparatedList';
import ExternalLink from '../externalLink';
import MITerm from './MITerm';
import style from './genePhysicalInteractionDetailTable.scss';
import { selectInteractions } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
import { fetchInteractions } from '../../actions/genes';

const DEFAULT_TABLE_KEY = 'physicalInteractionTable';

class GenePhysicalInteractionDetailTable extends React.Component {
  loadInteractions () {
    const { dispatch, focusGeneId } = this.props;
    dispatch(fetchInteractions(focusGeneId));
  }

  getCellId(fieldKey, rowIndex) {
    return `${this.props.tableKey || DEFAULT_TABLE_KEY}-${fieldKey}-${rowIndex}`;
  }

  render() {
    const {focusGeneDisplayName, focusGeneId, interactions} = this.props;

    const columns = [
      {
        dataField: 'primaryKey',
        text: 'key',
        hidden: true,
      },
      {
        dataField: 'interactorAType',
        text: 'Focus gene molecule type ID',
        hidden: true,
      },
      {
        dataField: 'interactorAType',
        text: `${focusGeneDisplayName} molecule type`,
        formatter: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorAType', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        headerStyle: {width: '6em'},
        headerClasses: style.columnHeaderGroup1,
        classes: style.columnGroup1,
      },
      {
        dataField: 'interactorARole',
        text: 'Focus gene experimental role ID',
        hidden: true,
      },
      {
        dataField: 'interactorARole',
        text: `${focusGeneDisplayName} experimental role`,
        formatter: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorARole', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        headerStyle: {width: '7em'},
        headerClasses: style.columnHeaderGroup1,
        classes: style.columnGroup1,
        hidden: true,
      },
      {
        dataField: 'geneB',
        text: 'Interactor gene ID',
        hidden: true,
      },
      {
        dataField: 'geneB',
        text: 'Interactor gene',
        formatter: GeneCell,
        headerStyle: {width: '6em'},
        headerClasses: style.columnHeaderGroup2,
        classes: style.columnGroup2,
      },
      {
        dataField: 'geneB',
        text: 'Interactor species ID',
        hidden: true,
      },
      {
        dataField: 'geneB',
        text: 'Interactor species',
        formatter: ({species} = {}) => (
          <i>{species.name}</i>
        ),
        headerStyle: {width: '8em'},
        headerClasses: style.columnHeaderGroup2,
        classes: style.columnGroup2,
      },
      {
        dataField: 'interactorBType',
        text: 'Interactor molecule type ID',
        hidden: true,
      },
      {
        dataField: 'interactorBType',
        text: 'Interactor molecule type',
        formatter: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorBType', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        headerStyle: {width: '6em'},
        headerClasses: style.columnHeaderGroup2,
        classes: style.columnGroup2,
      },
      {
        dataField: 'interactorBRole',
        text: 'Interactor experimental role ID',
        hidden: true,
      },
      {
        dataField: 'interactorBRole',
        text: 'Interactor experimental role',
        formatter: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorBRole', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        headerStyle: {width: '7em'},
        headerClasses: style.columnHeaderGroup2,
        classes: style.columnGroup2,
        hidden: true,
      },
      {
        dataField: 'interactionType',
        text: 'Interaction type ID',
        hidden: true,
      },
      {
        dataField: 'interactionType',
        text: 'Interaction type',
        formatter: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactionType', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        headerStyle: {width: '8em'},
        headerClasses: style.columnHeaderGroup3,
        classes: style.columnGroup3,
        hidden: true,
      },
      {
        dataField: 'detectionsMethods',
        text: 'Detection method IDs',
        hidden: true,
      },
      {
        dataField: 'detectionsMethods',
        text: 'Detection methods',
        formatter: (items = [], row, formatExtraData, rowIndex) => {
          return (
            <CommaSeparatedList>
              {
                items.map(
                  (props = {}, index) => {
                    const id = this.getCellId('detectionsMethods', `${rowIndex}-${index}`);
                    return (
                      <MITerm key={id} {...props} id={id} />
                    );
                  }
                )
              }
            </CommaSeparatedList>
          );
        },
        headerStyle: {width: '10em'},
        headerClasses: style.columnHeaderGroup3,
        classes: style.columnGroup3,
      },
      {
        dataField: 'crossReferences',
        text: 'Source ID',
        hidden: true,
      },
      {
        dataField: 'crossReferences',
        text: 'Source',
        formatter: (crossReferences = [], {sourceDatabase = {}, aggregationDatabase = {}} = {}) => (
          <div>
            {
              crossReferences.map(({primaryKey, displayName, prefix, url} = {}) => (
                <div key={primaryKey}>
                  <ExternalLink href={url}>{prefix}:{displayName}</ExternalLink>
                </div>
              ))
            }
            {
              (!aggregationDatabase || sourceDatabase.label === aggregationDatabase.label) ?
                null :
                <span>
                  <ExternalLink href={sourceDatabase.url}>{sourceDatabase.label}</ExternalLink>
                  <i><span> via </span></i>
                  <ExternalLink href={aggregationDatabase.url}>{aggregationDatabase.label}</ExternalLink>
                </span>
            }
          </div>
        ),
        headerStyle: {width: '16em'},
        headerClasses: style.columnHeaderGroup0,
        classes: style.columnGroup0,
      },
      {
        dataField: 'sourceDatabase',
        text: 'Source DB ID',
        hidden: true,
      },
      {
        dataField: 'sourceDatabase',
        text: 'Source DB',
        formatter: ({label, url} = {}, row) => {
          return (!row.aggregationDatabase || label === row.aggregationDatabase.label) ?
            <span><ExternalLink href={url}>{label}</ExternalLink></span> :
            <span>
              <ExternalLink href={url}>{label}</ExternalLink>
              <i><span> via </span></i>
              <ExternalLink href={row.aggregationDatabase.url}>{row.aggregationDatabase.label}</ExternalLink>
            </span>;
        },
        headerStyle: {width: '10em'},
        headerClasses: style.columnHeaderGroup3,
        classes: style.columnGroup3,
        hidden: true,
      },
      {
        dataField: 'aggregationDatabase',
        text: 'Aggregation DB ID',
        hidden: true,
      },
      {
        dataField: 'aggregationDatabase',
        text: 'Aggregation DB',
        hidden: true,
      },
      {
        dataField: 'publication',
        text: 'Reference',
        formatter: ({pubMedUrl, primaryKey} = {}) => <ExternalLink href={pubMedUrl}>{primaryKey}</ExternalLink>,
        headerStyle: {width: '10em'},
        headerClasses: style.columnHeaderGroup3,
        classes: style.columnGroup3,
      },
    ];
    const data = (interactions.data || []).map((interaction = {}) => {
      const {
        // fields that might need to be rewrite
        geneA,
        interactorAType,
        interactorARole,
        geneB,
        interactorBType,
        interactorBRole,

        // other fields
        crossReferences,
        interactionType,
        detectionsMethods,
        sourceDatabase,
        aggregationDatabase,
        publication,
      } = interaction;
      const interactionRewriteFields = geneA.id === this.props.focusGeneId ? {
        geneA,
        interactorAType,
        interactorARole,
        geneB,
        interactorBType,
        interactorBRole,
      } : {
        geneA: geneB,
        interactorAType: interactorBType,
        interactorARole: interactorBRole,
        geneB: geneA,
        interactorBType: interactorAType,
        interactorBRole: interactorARole,
      };
      return Object.assign({
        crossReferences,
        interactionType,
        detectionsMethods,
        sourceDatabase,
        aggregationDatabase,
        publication,
      }, interactionRewriteFields);
    });

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/disease/${focusGeneId}/interactions/download`}
        keyField='primaryKey'
        loading={interactions.loading}
        onUpdate={this.loadInteractions.bind(this)}
        totalRows={interactions.total}
      />
    );
  }
}

GenePhysicalInteractionDetailTable.propTypes = {
  dispatch: PropTypes.func,
  filename: PropTypes.any,
  focusGeneDisplayName: PropTypes.string,
  focusGeneId: PropTypes.string.isRequired,
  interactions: PropTypes.object,
  tableKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
  interactions: selectInteractions(state)
});

export default connect(mapStateToProps)(GenePhysicalInteractionDetailTable);
