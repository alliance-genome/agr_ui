import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  ReferenceCell,
} from '../../components/dataTable';
import hash from 'object-hash';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import useDataTableQuery from '../../hooks/useDataTableQuery';

const AlleleToPhenotypeTable = ({alleleId}) => {
  const {
    data: results,
    ...tableProps
  } = useDataTableQuery(`/api/allele/${alleleId}/phenotypes`);

  const columns = [
    {
      dataField: 'phenotype',
      text: 'Phenotype',
      formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}}/>,
      headerStyle: {width: '120px'},
      filterable: true,
      filterName: 'termName',
    },
    {
      dataField: 'primaryAnnotatedEntities',
      text: 'Annotation details',
      formatter: entities => <AnnotatedEntitiesPopup entities={entities}/>,
      headerStyle: {width: '90px'},
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source && source.name,
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

  const data = results?.map(record => ({
    ...record,
    id: hash(record),
  }));

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={`/api/allele/${alleleId}/phenotypes/download`}
      key={alleleId}
      keyField='id'
    />
  );
};

AlleleToPhenotypeTable.propTypes = {
  alleleId: PropTypes.string,
};

export default AlleleToPhenotypeTable;
