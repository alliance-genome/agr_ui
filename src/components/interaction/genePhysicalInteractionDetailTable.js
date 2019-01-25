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
import { selectInteractions } from '../../selectors/geneSelectors';
import { connect } from 'react-redux';
import { fetchInteractions } from '../../actions/genes';
import LoadingSpinner from '../loadingSpinner';
import NoData from '../noData';

const DEFAULT_TABLE_KEY = 'physicalInteractionTable';

class GenePhysicalInteractionDetailTable extends React.Component {
  componentDidMount () {
    const { dispatch, focusGeneId } = this.props;
    dispatch(fetchInteractions(focusGeneId));
  }

  componentDidUpdate (prevProps) {
    const { dispatch, focusGeneId } = this.props;
    if (focusGeneId !== prevProps.focusGeneId) {
      dispatch(fetchInteractions(focusGeneId));
    }
  }

  getCellId(fieldKey, rowIndex) {
    return `${this.props.tableKey || DEFAULT_TABLE_KEY}-${fieldKey}-${rowIndex}`;
  }

  render() {
    const {filename, focusGeneDisplayName, interactions} = this.props;

    const columns = [
      {
        field: 'interactorAType',
        label: 'Focus gene molecule type ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactorAType',
        label: `${focusGeneDisplayName} molecule type`,
        csvHeader: 'Focus gene molecule type',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorAType', rowIndex);
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
        field: 'interactorARole',
        label: 'Focus gene experimental role ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactorARole',
        label: `${focusGeneDisplayName} experimental role`,
        csvHeader: 'Focus gene experimental role',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorARole', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '7em',
        className: style.columnHeaderGroup1,
        columnClassName: style.columnGroup1,
        hidden: true,
        export: true,
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
        field: 'interactorBType',
        label: 'Interactor molecule type ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactorBType',
        label: 'Interactor molecule type',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorBType', rowIndex);
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
        field: 'interactorBRole',
        label: 'Interactor experimental role ID',
        asText: ({primaryKey} = {}) => primaryKey,
        hidden: true,
        export: true,
      },
      {
        field: 'interactorBRole',
        label: 'Interactor experimental role',
        format: (fieldData = {}, row, formatExtraData, rowIndex) => {
          const id = this.getCellId('interactorBRole', rowIndex);
          return (
            <MITerm {...fieldData} id={id} />
          );
        },
        asText: ({label} = {}) => label,
        width: '7em',
        className: style.columnHeaderGroup2,
        columnClassName: style.columnGroup2,
        hidden: true,
        export: true,
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
        hidden: true,
        export: true,
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
        asText: (crossReferences = []) => (
          crossReferences.map(({displayName} = {}) => (displayName)).join(',')
        ),
        hidden: true,
        export: true,
      },
      {
        field: 'crossReferences',
        label: 'Source',
        isKey: true,
        format: (crossReferences = [], {sourceDatabase = {}, aggregationDatabase = {}} = {}) => (
          <div>
            {
              crossReferences.map(({displayName, crossRefCompleteUrl} = {}) => (
                <div key={displayName}><ExternalLink href={crossRefCompleteUrl}>{sourceDatabase.label}: {displayName}</ExternalLink></div>
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
        width: '14em',
        className: style.columnHeaderGroup0,
        columnClassName: style.columnGroup0,
        export: false,
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
        hidden: true,
        export: true,
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
      const interactionRewriteFields = geneA.geneID === this.props.focusGeneId ? {
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
    }).sort(({geneB: geneX} = {}, {geneB: geneY} = {}) => {
      const getGeneName = ({symbol} = {}) => ((symbol || '').toUpperCase());
      const nameX = getGeneName(geneX);
      const nameY = getGeneName(geneY);

      if (nameX < nameY) {
        return -1;
      }
      if (nameX > nameY) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    if (interactions.loading) {
      return <LoadingSpinner />;
    }

    if (interactions.data.length === 0) {
      return <NoData />;
    }

    return (
      <LocalDataTable
        columns={columns}
        data={data}
        filename={filename}
        paginated
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
