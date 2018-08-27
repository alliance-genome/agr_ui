import React from 'react';
import PropTypes from 'prop-types';
import {
  LocalDataTable,
  GeneCell,
} from '../dataTable';
import CommaSeparatedList from '../commaSeparatedList';
import ExternalLink from '../externalLink';

export default class GenePhysicalInteractionDetailTable extends React.Component {
  render() {
    const {focusGeneDisplayName} = this.props;

    const columns = [
      {
        field: 'crossReference',
        label: 'Source ID',
        isKey: true,
        format: ({displayName, crossRefCompleteUrl}) => (
          <a href={crossRefCompleteUrl}>{displayName}</a>
        ),
        width: '10em',
      },
      {
        field: 'interactionAType',
        label: `${focusGeneDisplayName} molecule type`,
        format: ({label}) => label,
        width: '6em',
      },
      {
        field: 'interactionARole',
        label: `${focusGeneDisplayName} experimental role`,
        format: ({label}) => label,
        width: '7em',
      },
      {
        field: 'geneB',
        label: 'Interactor gene',
        format: GeneCell,
        width: '6em',
      },
      {
        field: 'geneB',
        label: 'Interactor species',
        format: ({species}) => species.name,
        width: '8em',
      },
      {
        field: 'interactionBType',
        label: 'Interactor molecule type',
        format: ({label}) => label,
        width: '6em',
      },
      {
        field: 'interactionBRole',
        label: 'Interactor experimental role',
        format: ({label}) => label,
        width: '7em',
      },
      {
        field: 'interactionType',
        label: 'Interaction type',
        format: ({label}) => label,
        width: '8em',
      },
      {
        field: 'detectionsMethods',
        label: 'Detection method',
        format: (items) => {
          return (
            <CommaSeparatedList>
              {
                items.map(({label}) => label)
              }
            </CommaSeparatedList>
          );
        },
        width: '12em',
      },
      {
        field: 'sourceDatabase',
        label: 'Source DB',
        format: ({label}, row) => {
          return (
            <span>
              <ExternalLink href="#">{label}</ExternalLink>
              <span> via </span>
              <ExternalLink href="#">{row.aggregationDatabase.label}</ExternalLink>
            </span>
          );
        },
        width: '10em',
      },
      {
        field: 'publication',
        label: 'Reference',
        format: ({pubMedUrl, primaryKey}) => <a href={pubMedUrl}>{primaryKey}</a>,
        width: '10em',
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
