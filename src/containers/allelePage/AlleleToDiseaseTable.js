import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  ReferenceCell,
  EvidenceCodesCell,
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from '../../components/disease/DiseaseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AssociationType from '../../components/AssociationType';
import { getDistinctFieldValue } from '../../components/dataTable/utils';

const AlleleToDiseaseTable = ({alleleId}) => {
  const {
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/allele/${alleleId}/diseases`);

  const columns = [
    {
      dataField: 'associationType',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      headerStyle: {width: '110px'},
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
    },
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
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: codes => <EvidenceCodesCell evidenceCodes={codes} />,
      headerStyle: {width: '100px'},
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
