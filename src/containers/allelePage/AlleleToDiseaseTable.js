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

const AlleleToDiseaseTable = ({alleleId}) => {
  const tableProps = useDataTableQuery(`/api/allele/${alleleId}/diseases`);

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
      {...tableProps}
      columns={columns}
      downloadUrl={`/api/allele/${alleleId}/diseases/download`}
      keyField='primaryKey'
    />
  );
};

AlleleToDiseaseTable.propTypes = {
  alleleId: PropTypes.string,
};

export default AlleleToDiseaseTable;
