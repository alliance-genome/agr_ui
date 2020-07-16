import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  EvidenceCodesCell,
  ReferenceCell,
  SpeciesCell
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import ExternalLink from '../../components/externalLink';
import DiseaseLink from '../../components/disease/DiseaseLink';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import LoadingSpinner from '../../components/loadingSpinner';

const DiseaseToModelTable = ({id}) => {
  const {
    isLoading,
    isFetching,
    resolvedData,
    tableState,
    setTableState
  } = useDataTableQuery(`/api/disease/${id}/models`);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const columns = [
    {
      dataField: 'model',
      text: 'Model',
      formatter: (model, row) => (
        <React.Fragment>
          <div>
            <ExternalLink href={model.modCrossRefCompleteUrl}>
              <span dangerouslySetInnerHTML={{__html: model.name}} />
            </ExternalLink>
          </div>
          <small>
            <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
              Based on inferences
            </AnnotatedEntitiesPopup>
          </small>
        </React.Fragment>
      ),
      filterable: true,
      filterName: 'modelName',
    },
    {
      dataField: 'species',
      text: 'Species',
      formatter: species => <SpeciesCell species={species} />,
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterLabelClassName: 'species-name',
      headerStyle: {width: '105px'},
    },
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: disease => <DiseaseLink disease={disease} />,
      filterable: true,
      headerStyle: {width: '150px'},
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: EvidenceCodesCell,
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source.name,
      filterable: true,
      headerStyle: {width: '85px'},
    },
    {
      dataField: 'publications',
      text: 'References',
      formatter: ReferenceCell,
      headerStyle: {width: '150px'},
      filterable: true,
      filterName: 'reference'
    }
  ];

  // need to pull out species in a separate field because we can't have
  // two columns based on the model field
  const data = resolvedData.results.map(association => ({
    species: association.model.species,
    ...association,
  }));

  const sortOptions = [
    {
      value: 'model',
      label: 'Model',
    },
    {
      value: 'disease',
      label: 'Disease',
    },
  ];


  return (
    <DataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/disease/${id}/models/download`}
      key={id}
      keyField='primaryKey'
      loading={isFetching}
      setTableState={setTableState}
      sortOptions={sortOptions}
      tableState={tableState}
      totalRows={resolvedData.total}
    />
  );
};

DiseaseToModelTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToModelTable;
