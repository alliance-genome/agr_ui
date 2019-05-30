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
  loadInteractions (opts) {
    const { dispatch, focusGeneId } = this.props;
    dispatch(fetchInteractions(focusGeneId, opts));
  }

  getCellId(fieldKey, rowIndex) {
    return `${this.props.tableKey || DEFAULT_TABLE_KEY}-${fieldKey}-${rowIndex}`;
  }

  render() {
    const {focusGeneDisplayName, focusGeneId, interactions} = this.props;

    const data = (interactions.data || []).map((interaction = {}) => ({
      id: interaction.primaryKey,
      moleculeType: interaction.interactorAType,
      interactorGeneSymbol: interaction.geneB,
      interactorSpecies: interaction.geneB.species,
      interactorMoleculeType: interaction.interactorBType,
      detectionMethod: interaction.detectionsMethods,
      source: interaction.crossReferences,
      aggregationDatabase: interaction.aggregationDatabase,
      sourceDatabase: interaction.sourceDatabase,
      reference: interaction.publication,
    }));

    const columns = [
      {
        dataField: 'id',
        text: 'id',
        hidden: true,
      },
      {
        dataField: 'moleculeType',
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
        filterable: true,
      },
      {
        dataField: 'interactorGeneSymbol',
        text: 'Interactor gene',
        formatter: GeneCell,
        headerStyle: {width: '6em'},
        headerClasses: style.columnHeaderGroup2,
        classes: style.columnGroup2,
        filterable: true,
      },
      {
        dataField: 'interactorSpecies',
        text: 'Interactor species',
        formatter: species => <i>{species.name}</i>,
        headerStyle: {width: '8em'},
        headerClasses: style.columnHeaderGroup2,
        classes: style.columnGroup2,
        filterable: true,
      },
      {
        dataField: 'interactorMoleculeType',
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
        filterable: true,
      },
      {
        dataField: 'detectionMethod',
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
        headerStyle: {width: '12em'},
        headerClasses: style.columnHeaderGroup3,
        classes: style.columnGroup3,
        filterable: true,
      },
      {
        dataField: 'source',
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
        filterable: true,
      },
      {
        dataField: 'reference',
        text: 'Reference',
        formatter: ({pubMedUrl, primaryKey} = {}) => <ExternalLink href={pubMedUrl}>{primaryKey}</ExternalLink>,
        headerStyle: {width: '10em'},
        headerClasses: style.columnHeaderGroup3,
        classes: style.columnGroup3,
        filterable: true,
      },
    ];

    const sortOptions = [
      {
        value: 'moleculeType',
        label: `${focusGeneDisplayName} molecule type`,
      },
      {
        value: 'interactorGeneSymbol',
        label: 'Interactor gene',
      },
      {
        value: 'interactorDetectionMethod',
        label: 'Detection method',
      },
      {
        value: 'interactorSpecies',
        label: 'Interactor species',
      }
    ];

    return (
      <React.Fragment>
        <RemoteDataTable
          columns={columns}
          data={data}
          downloadUrl={`/api/gene/${focusGeneId}/interactions/download`}
          keyField='id'
          loading={interactions.loading}
          onUpdate={this.loadInteractions.bind(this)}
          sortOptions={sortOptions}
          summaryProps={
            interactions.supplementalData ? {
              ...interactions.supplementalData.annotationSummary,
              entityType: 'interactor gene'
            } : null
          }
          totalRows={interactions.total}
        />
      </React.Fragment>
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
