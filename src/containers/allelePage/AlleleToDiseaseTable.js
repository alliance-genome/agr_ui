import PropTypes from 'prop-types';
import {
  DataTable,
  EvidenceCodesCellCuration,
  ReferencesCellCuration,
} from '../../components/dataTable';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';
import AssociationType from '../../components/AssociationType';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import { 
  buildProvidersWithUrl,
  getDistinctFieldValue } from '../../components/dataTable/utils';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import { ALLELE_DETAILS_COLUMNS } from '../../components/dataTable/constants';

const AlleleToDiseaseTable = ({alleleId}) => {
  const {
    resolvedData,
    data: results,
    ...tableProps
  } = useDataTableQuery(`/api/allele/${alleleId}/diseases`);

  const tableData = results?.map(annotation => ({
    providers: buildProvidersWithUrl(annotation.primaryAnnotations),
    ...annotation,
  }));

  const columns = [
    {
      dataField: 'generatedRelationString',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      headerStyle: {width: '110px'},
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers}/>,
      headerStyle: {width: '110px'},
      filterable: getDistinctFieldValue(resolvedData, 'diseaseQualifiers'),
      filterName: 'diseaseQualifier',
      filterType: 'checkbox'
    },
    {
      dataField: 'object',
      text: 'Disease',
      formatter: disease => <DiseaseLinkCuration disease={disease} />,
      headerStyle: {width: '100px'},
      filterName: 'disease',
      filterable: true,
    },
    {
      dataField: 'primaryAnnotations',
      text: 'Annotation details',
      formatter: (entities, row) => <AnnotatedEntitiesPopupCuration 
        entities={entities} 
        pubModIds={row.pubmedPubModIDs} 
        columnNameSet={ALLELE_DETAILS_COLUMNS}
      />,
      headerStyle: {width: '90px'},
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: codes => <EvidenceCodesCellCuration evidenceCodes={codes} />,
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'providers',
      text: 'Source',   
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      filterable: true,
      headerStyle: {width: '100px'},
      filterName: 'dataProvider',
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      formatter: (pubModIds) => <ReferencesCellCuration pubModIds={pubModIds}/>,
      headerStyle: {width: '150px'},
      filterable: true,
      filterName: 'reference',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={tableData}
      downloadUrl={`/api/allele/${alleleId}/diseases/download`}
      keyField='uniqueId'
    />
  );
};

AlleleToDiseaseTable.propTypes = {
  alleleId: PropTypes.string,
};

export default AlleleToDiseaseTable;
