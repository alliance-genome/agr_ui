import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import {
  ReferenceCell,
  DataTable
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import useDataTableQuery from '../../hooks/useDataTableQuery';

const PhenotypeTable = ({geneId}) => {
  const {
    data: results,
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/gene/${geneId}/phenotypes`);

  const data = results.map(record => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'phenotype',
      text: 'Phenotype Term',
      formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}}/>,
      headerStyle: {width: '120px'},
      filterable: true,
      filterName: 'termName',
    },
    {
      dataField: 'primaryAnnotatedEntities',
      text: 'Based on Inferences',
      formatter: entities => <AnnotatedEntitiesPopup entities={entities}/>,
      headerStyle: {width: '90px'},
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
      data={data}
      downloadUrl={`/api/gene/${geneId}/phenotypes/download`}
      keyField='id'
      summaryProps={
        (resolvedData && resolvedData.supplementalData) ? {
          ...resolvedData.supplementalData.annotationSummary,
          entityType: 'phenotype'
        } : null
      }
    />
  );
};

PhenotypeTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default PhenotypeTable;
