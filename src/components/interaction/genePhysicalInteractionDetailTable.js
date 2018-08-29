import React from 'react';
import PropTypes from 'prop-types';
import {
  LocalDataTable,
  GeneCell,
} from '../dataTable';
import CommaSeparatedList from '../commaSeparatedList';
import ExternalLink from '../externalLink';
import style from './genePhysicalInteractionDetailTable.scss';

export default class GenePhysicalInteractionDetailTable extends React.Component {
  render() {
    const {focusGeneDisplayName} = this.props;

    const columns = [
      {
        field: 'crossReference',
        label: 'Source ID',
        isKey: true,
        format: ({displayName, crossRefCompleteUrl}) => (
          <ExternalLink href={crossRefCompleteUrl}>{displayName}</ExternalLink>
        ),
        asText: ({displayName}) => displayName,
        width: '12em',
        className: style.columnHeaderGroup0,
        columnClassName: style.columnGroup0,
      },
      {
        field: 'interactionAType',
        label: 'Focus gene molecule type ID',
        asText: ({primaryKey}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionAType',
        label: `${focusGeneDisplayName} molecule type`,
        csvHeader: 'Focus gene molecule type',
        format: ({label}) => label,
        width: '6em',
        className: style.columnHeaderGroup1,
        columnClassName: style.columnGroup1,
      },
      {
        field: 'interactionARole',
        label: 'Focus gene experimental role ID',
        asText: ({primaryKey}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionARole',
        label: `${focusGeneDisplayName} experimental role`,
        csvHeader: 'Focus gene experimental role',
        format: ({label}) => label,
        width: '7em',
        className: style.columnHeaderGroup1,
        columnClassName: style.columnGroup1,
      },
      {
        field: 'geneB',
        label: 'Interactor gene ID',
        asText: ({geneID, primaryKey}) => geneID || primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'geneB',
        label: 'Interactor gene',
        csvHeader: 'Interactor gene',
        format: GeneCell,
        asText: ({symbol}) => symbol,
        width: '6em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'geneB',
        label: 'Interactor species ID',
        asText: ({species}) => species.primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'geneB',
        label: 'Interactor species',
        format: ({species}) => species.name,
        width: '8em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'interactionBType',
        label: 'Interactor molecule type ID',
        asText: ({primaryKey}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionBType',
        label: 'Interactor molecule type',
        format: ({label}) => label,
        width: '6em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'interactionBRole',
        label: 'Interactor experimental role ID',
        asText: ({label}) => label,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionBRole',
        label: 'Interactor experimental role',
        format: ({label}) => label,
        width: '7em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
      },
      {
        field: 'interactionType',
        label: 'Interaction type ID',
        asText: ({primaryKey}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactionType',
        label: 'Interaction type',
        format: ({label}) => label,
        width: '8em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
      {
        field: 'detectionsMethods',
        label: 'Detection method IDs',
        asText: (items) => {
          return items.map(
            ({primaryKey}) => primaryKey
          ).join(',');
        },
        hidden: true,
        export: true,
      },
      {
        field: 'detectionsMethods',
        label: 'Detection methods',
        format: (items) => {
          return (
            <CommaSeparatedList>
              {
                items.map(({label}) => label)
              }
            </CommaSeparatedList>
          );
        },
        asText: (items) => {
          return items.map(
            ({label}) => label
          ).join(',');
        },
        width: '12em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
      {
        field: 'sourceDatabase',
        label: 'Source DB ID',
        asText: ({primaryKey}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'sourceDatabase',
        label: 'Source DB',
        format: ({label}, row) => {
          return label === row.aggregationDatabase.label ?
            <span><ExternalLink href="#">{label}</ExternalLink></span> :
            <span>
              <ExternalLink href="#">{label}</ExternalLink>
              <span> via </span>
              <ExternalLink href="#">{row.aggregationDatabase.label}</ExternalLink>
            </span>;
        },
        asText: ({label}) => label,
        width: '10em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
      {
        field: 'aggregationDatabase',
        label: 'Aggregation DB ID',
        asText: ({primaryKey}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'aggregationDatabase',
        label: 'Aggregation DB',
        asText: ({label}) => label,
        hidden: true,
        export: true,
      },
      {
        field: 'publication',
        label: 'Reference',
        format: ({pubMedUrl, primaryKey}) => <ExternalLink href={pubMedUrl}>{primaryKey}</ExternalLink>,
        asText: ({primaryKey}) => primaryKey,
        width: '10em',
        className: style.columnHeaderGroup3,
        columnClassName: style.columnGroup3,
      },
    ];
    return (
      <LocalDataTable
        columns={columns}
        data={this.props.data}
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
};
