import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  GeneCell,
} from '../dataTable';
import CommaSeparatedList from '../commaSeparatedList';
import ExternalLink from '../externalLink';
import MITerm from './MITerm';
import style from './genePhysicalInteractionDetailTable.scss';
import {getDistinctFieldValue} from '../dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import LoadingSpinner from '../loadingSpinner';

const DEFAULT_TABLE_KEY = 'physicalInteractionTable';

const GenePhysicalInteractionDetailTable = ({focusGeneDisplayName, focusGeneId}) => {
  const {
    isFetching,
    isLoading,
    resolvedData,
    tableState,
    setTableState,
  } = useDataTableQuery(`/api/gene/${focusGeneId}/interactions`);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getCellId = (fieldKey, rowIndex) => {
    return `${DEFAULT_TABLE_KEY}-${fieldKey}-${rowIndex}`;
  };

  const data = (resolvedData.results || []).map((interaction = {}) => ({
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
      text:
        <React.Fragment>
          <span className="text-transform-none">{focusGeneDisplayName}</span> molecule type
        </React.Fragment>,
      formatter: (fieldData = {}, row, rowIndex) => {
        const id = getCellId('interactorAType', rowIndex);
        return (
          <MITerm {...fieldData} id={id} />
        );
      },
      headerStyle: {width: '6em'},
      headerClasses: style.columnHeaderGroup1,
      classes: style.columnGroup1,
      filterable: getDistinctFieldValue(resolvedData, 'filter.moleculeType'),
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
      filterable: getDistinctFieldValue(resolvedData, 'filter.interactorSpecies').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterLabelClassName: 'species-name',
    },
    {
      dataField: 'interactorMoleculeType',
      text: 'Interactor molecule type',
      formatter: (fieldData = {}, row, rowIndex) => {
        const id = getCellId('interactorBType', rowIndex);
        return (
          <MITerm {...fieldData} id={id} />
        );
      },
      headerStyle: {width: '6em'},
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: getDistinctFieldValue(resolvedData, 'filter.interactorMoleculeType'),
    },
    {
      dataField: 'detectionMethod',
      text: 'Detection methods',
      formatter: (items = [], row, rowIndex) => {
        return (
          <CommaSeparatedList>
            {
              items.map(
                (props = {}, index) => {
                  const id = getCellId('detectionsMethods', `${rowIndex}-${index}`);
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
      // eslint-disable-next-line react/prop-types
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
      value: 'interactorSpecies',
      label: 'Interactor species',
    },
    {
      value: 'interactorMoleculeType',
      label: 'Interactor molecule type',
    },
    {
      value: 'interactorDetectionMethod',
      label: 'Detection method',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/gene/${focusGeneId}/interactions/download`}
      keyField='id'
      loading={isFetching}
      setTableState={setTableState}
      sortOptions={sortOptions}
      summaryProps={
        resolvedData.supplementalData ? {
          ...resolvedData.supplementalData.annotationSummary,
          entityType: 'interactor gene'
        } : null
      }
      tableState={tableState}
      totalRows={resolvedData.total}
    />
  );
};

GenePhysicalInteractionDetailTable.propTypes = {
  focusGeneDisplayName: PropTypes.string,
  focusGeneId: PropTypes.string.isRequired,
};

export default GenePhysicalInteractionDetailTable;
