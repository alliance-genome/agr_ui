import PropTypes from 'prop-types';
import {
  DataTable,
  EvidenceCodesCellCuration,
  ReferencesCellCuration,
} from '../../components/dataTable';
import AlleleSource from '../../components/dataTable/AlleleSource';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';
import AssociationType from '../../components/AssociationType';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import { getDistinctFieldValue } from '../../components/dataTable/utils';
import useDataTableQuery from '../../hooks/useDataTableQuery';

const AlleleToDiseaseTable = ({alleleId}) => {
  const {
    resolvedData,
    data: results,
    ...tableProps
  } = useDataTableQuery(`/api/allele/${alleleId}/diseases`);

  let AllDisQualifiers = new Set();

  function consolidateDiseaseQualifiers(annotation) {    
    let diseaseQualifiers = new Set();
    
    annotation.primaryAnnotations.forEach(pa => {      
      if(pa.diseaseQualifiers){        
        pa.diseaseQualifiers.forEach(dq => { 
          const DQname = dq.name.replace(/_/g, ' ');
          diseaseQualifiers.add(DQname)
          AllDisQualifiers.add(DQname);
        });
      }
    })   
    return Array.from(diseaseQualifiers);
  }

  const tableData = results.map(annotation => ({
    consolidatedDiseaseQualifiers: consolidateDiseaseQualifiers(annotation),
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
      dataField: 'consolidatedDiseaseQualifiers',
      text: 'Disease Qualifier',
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers}/>,
      headerStyle: {width: '110px'},
      // filterable: Array.from(AllDisQualifiers),  TODO: the filter is failing to select the rows
      filterable: false,
      filterType: 'checkbox',
      filterName: 'diseaseQualifier'
    },
    {
      dataField: 'object',
      text: 'Disease',
      formatter: disease => <DiseaseLinkCuration disease={disease} />,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'primaryAnnotations',
      text: 'Annotation details',
      formatter: entities => <AnnotatedEntitiesPopupCuration entities={entities}/>,
      headerStyle: {width: '90px'},
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: codes => <EvidenceCodesCellCuration evidenceCodes={codes} />,
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'subject',
      text: 'Source',   
      formatter: subject => <AlleleSource dataProvider={subject?.dataProvider}/>,
      headerStyle: {width: '100px'},
      filterable: true
    },
    {
      dataField: 'references',
      text: 'References',
      formatter: references => ReferencesCellCuration(references),
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
