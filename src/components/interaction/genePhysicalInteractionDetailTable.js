import React from 'react';
import PropTypes from 'prop-types';
import {
  LocalDataTable,
  GeneCell,
} from '../dataTable';
import CommaSeparatedList from '../commaSeparatedList';
import ExternalLink from '../externalLink';
import MITerm from './MITerm';
import style from './genePhysicalInteractionDetailTable.scss';

const DEFAULT_TABLE_KEY = 'physicalInteractionTable';

export default class GenePhysicalInteractionDetailTable extends React.Component {

  getCellId(fieldKey, rowIndex) {
    return `${this.props.tableKey || DEFAULT_TABLE_KEY}-${fieldKey}-${rowIndex}`;
  }

  render() {
    const {focusGeneDisplayName} = this.props;

    const columns = [
      {
        field: 'interactionAType',
        label: 'Focus gene molecule type ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionAType',
        label: `${focusGeneDisplayName} molecule type`,
        csvHeader: 'Focus gene molecule type',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactionAType', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '6em',
        className: style.columnHeaderGroup1,
        columnClassName: style.columnGroup1,
      },
      {
        field: 'interactionARole',
        label: 'Focus gene experimental role ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionARole',
        label: `${focusGeneDisplayName} experimental role`,
        csvHeader: 'Focus gene experimental role',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactionARole', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '7em',
        className: style.columnHeaderGroup1,
        columnClassName: style.columnGroup1,
      },
      {
        field: 'geneB',
        label: 'Interactor gene ID',
        asText: ({geneID} = {}) => geneID,
        hidden: true,
        export: true,
      },
      {
        field: 'geneB',
        label: 'Interactor gene',
        csvHeader: 'Interactor gene',
        format: GeneCell,
        asText: ({symbol} = {}) => symbol,
        width: '6em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'geneB',
        label: 'Interactor species ID',
        asText: ({species} = {}) => species.primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'geneB',
        label: 'Interactor species',
        format: ({species} = {}) => (
          <i>{species.name}</i>
        ),
        asText: ({species} = {}) => species.name,
        width: '8em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'interactionBType',
        label: 'Interactor molecule type ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionBType',
        label: 'Interactor molecule type',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactionBType', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '6em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'interactionBRole',
        label: 'Interactor experimental role ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionBRole',
        label: 'Interactor experimental role',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactionBRole', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '7em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'interactionType',
        label: 'Interaction type ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionType',
        label: 'Interaction type',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactionType', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '8em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
      {
        field: 'detectionsMethods',
        label: 'Detection method IDs',
        asText: (items = []) => {
          return items.map(
            ({primaryKey} = {}) => primaryKey
          ).join(',');
        },
        hidden: true,
        export: true,
      },
      {
        field: 'detectionsMethods',
        label: 'Detection methods',
        format: (items = [], row, formatExtraData, rowIndex) => {
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
        asText: (items = []) => {
          return items.map(
            ({label} = {}) => label
          ).join(',');
        },
        width: '12em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
      {
        field: 'crossReferences',
        label: 'Source ID',
        isKey: true,
        format: (crossReferences = []) => (
          <div>
            {
              crossReferences.map(({displayName, crossRefCompleteUrl} = {}) => (
                <div key={displayName}><ExternalLink href={crossRefCompleteUrl}>{displayName}</ExternalLink></div>
              ))
            }
          </div>
        ),
        asText: (crossReferences = []) => (
          crossReferences.map(({displayName} = {}) => (displayName)).join(',')
        ),
        width: '14em',
        className: style.columnHeaderGroup0,
        columnClassName: style.columnGroup0,
      },
      {
        field: 'sourceDatabase',
        label: 'Source DB ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'sourceDatabase',
        label: 'Source DB',
        format: ({label, url} = {}, row) => {
          return (!row.aggregationDatabase || label === row.aggregationDatabase.label) ?
            <span><ExternalLink href={url}>{label}</ExternalLink></span> :
            <span>
              <ExternalLink href={url}>{label}</ExternalLink>
              <i><span> via </span></i>
              <ExternalLink href={row.aggregationDatabase.url}>{row.aggregationDatabase.label}</ExternalLink>
            </span>;
        },
        asText: ({label} = {}) => label,
        width: '10em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
      {
        field: 'aggregationDatabase',
        label: 'Aggregation DB ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'aggregationDatabase',
        label: 'Aggregation DB',
        asText: ({label} = {}) => label,
        hidden: true,
        export: true,
      },
      {
        field: 'publication',
        label: 'Reference',
        format: ({pubMedUrl, primaryKey} = {}) => <ExternalLink href={pubMedUrl}>{primaryKey}</ExternalLink>,
        asText: ({primaryKey} = {}) => primaryKey,
        width: '10em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
    ];
    const data = (this.props.data || []).map((interaction = {}) => {
      const {
        // fields that might need to be rewrite
        geneA,
        interactionAType,
        interactionARole,
        geneB,
        interactionBType,
        interactionBRole,

        // other fields
        crossReferences,
        interactionType,
        detectionsMethods,
        sourceDatabase,
        aggregationDatabase,
        publication,
      } = interaction;
      const interactionRewriteFields = geneA.geneID === this.props.focusGeneId ? {
        geneA,
        interactionAType,
        interactionARole,
        geneB,
        interactionBType,
        interactionBRole,
      } : {
        geneA: geneB,
        interactionAType: interactionBType,
        interactionARole: interactionBRole,
        geneB: geneA,
        interactionBType: interactionAType,
        interactionBRole: interactionARole,
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
//    console.log(data);
    return (
      <LocalDataTable
        columns={columns}
        data={data}
        filename={this.props.filename}
        paginated
      />
    );
  }
}

GenePhysicalInteractionDetailTable.propTypes = {
  data: PropTypes.any,
  filename: PropTypes.any,
  focusGeneDisplayName: PropTypes.string,
  focusGeneId: PropTypes.string.isRequired,
  tableKey: PropTypes.string,
};
