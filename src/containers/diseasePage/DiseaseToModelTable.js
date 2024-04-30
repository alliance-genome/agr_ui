import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  EvidenceCodesCellCuration,
  ReferencesCellCuration,
  SpeciesCell
} from '../../components/dataTable';
import ExperimentalConditionCellCuration from '../../components/dataTable/ExperimentalConditionCellCuration';
import GeneticModifiersCellCuration from '../../components/dataTable/GeneticModifiersCellCuration';
import { buildProvidersWithUrl, getIdentifier } from '../../components/dataTable/utils';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import SpeciesName from '../../components/SpeciesName';
import AssociationType from '../../components/AssociationType';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import ModelCellCuration from '../../components/dataTable/ModelCellCuration';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';
import { MODEL_DETAILS_COLUMNS } from './constants';


const DiseaseToModelTable = ({id}) => {
  const {
    data: results,
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/disease/${id}/models`, undefined, { sizePerPage: 10, }, {}, 60000);

  const columns = [
    {
      dataField: 'subject',
      text: 'Model',
      formatter: (subject, rowData) => (
        <>
          <div>
            <ModelCellCuration model={subject}/>
          </div>
          <small>
            <AnnotatedEntitiesPopupCuration
              parentPage='disease-page-model-table'
              entities={rowData.primaryAnnotations}
              mainRowCurie={getIdentifier(subject)}
              pubModIds={rowData.pubmedPubModIDs}
              columnNameSet={MODEL_DETAILS_COLUMNS}
            >
              Annotation details
            </AnnotatedEntitiesPopupCuration>
          </small>
        </>
      ),
      filterName: 'modelName',
      headerStyle: {width: '280px'},
    },
    {
      dataField: 'subject.taxon',
      text: 'Species',
      formatter: species => <SpeciesCell species={species} />,
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '105px'},
    },
    {
      dataField: 'experimentalConditionList',
      text: 'Experimental condition',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'generatedRelationString',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifiers',
      headerStyle: { width: '150px' },
      formatter: qualifiers => <DiseaseQualifiersColumn qualifiers={qualifiers}/>,
    },
    {
      dataField: 'disease',
      text: 'Disease',
      headerStyle: { width: '150px' },
      formatter: (curie, row) => <DiseaseLinkCuration disease={row.object} />,
    },
    {
      dataField: 'conditionModifierList',
      text: 'Condition Modifier',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'geneticModifierList',
      text: 'Genetic Modifier',
      formatter: (modifiers, row) => <GeneticModifiersCellCuration relation={row.geneticModifierRelation} modifiers={modifiers} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: codes => <EvidenceCodesCellCuration evidenceCodes={codes} />,
      headerStyle: {width: '100px'},
      filterName: 'evidenceCode',
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      headerStyle: { width: '100px' },
      filterName: 'dataProvider',
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      formatter: (pubModIds) => <ReferencesCellCuration pubModIds={pubModIds}/>,
      headerStyle: {width: '150px'},
      filterName: 'reference'
    }
  ];

  const data = results.map(association => ({
    species: association.subject?.species,
    providers: buildProvidersWithUrl(association.primaryAnnotations),
    ...association,
  }));


  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={`/api/disease/${id}/models/download`}
      keyField='primaryKey'
    />
  );
};

DiseaseToModelTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToModelTable;
