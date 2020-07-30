import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  ReferenceCell,
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from '../../components/disease/DiseaseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import LoadingSpinner from '../../components/loadingSpinner';

const AlleleToDiseaseTable = ({alleleId}) => {
  const {
    isLoading,
    isFetching,
    resolvedData,
    tableState,
    setTableState
  } = useDataTableQuery(`/api/allele/${alleleId}/diseases`);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const columns = [
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: disease => <DiseaseLink disease={disease} />,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'primaryAnnotatedEntities',
      text: 'Inferred From',
      formatter: entities => <AnnotatedEntitiesPopup entities={entities}/>,
      headerStyle: {width: '90px'},
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'publications',
      text: 'References',
      formatter: ReferenceCell,
      headerStyle: {width: '150px'},
      filterable: true,
      filterName: 'reference',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={resolvedData.results}
      downloadUrl={`/api/allele/${alleleId}/diseases/download`}
      keyField='primaryKey'
      loading={isFetching}
      setTableState={setTableState}
      tableState={tableState}
      totalRows={resolvedData.total}
    />
  );
};

AlleleToDiseaseTable.propTypes = {
  alleleId: PropTypes.string,
};

export default AlleleToDiseaseTable;
