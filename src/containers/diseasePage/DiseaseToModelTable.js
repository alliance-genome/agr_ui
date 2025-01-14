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
import { buildProvidersWithUrl, getIdentifier, getDistinctFieldValue } from '../../components/dataTable/utils';
import { compareByFixedOrder } from '../../lib/utils';
import { SPECIES_NAME_ORDER } from '../../constants';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import SpeciesName from '../../components/SpeciesName';
import AssociationType from '../../components/AssociationType';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import ModelCellCuration from '../../components/dataTable/ModelCellCuration';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';
import { MODEL_DETAILS_COLUMNS } from '../../components/dataTable/constants';


const DiseaseToModelTable = ({id}) => {
  const {
    data: results,
    supplementalData,
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
      filterable: true,
      filterName: 'modelName',
      headerStyle: {width: '280px'},
    },
    {
      dataField: 'subject.taxon',
      text: 'Species',
      formatter: species => <SpeciesCell species={species} />,
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '105px'},
      filterName: 'species',
      filterable: getDistinctFieldValue(supplementalData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterType: 'checkbox',
    },
    {
      dataField: 'experimentalConditionList',
      text: 'Experimental condition',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
      filterName: "experimentalCondition",
      filterable: true,
    },
    {
      dataField: 'generatedRelationString',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
      filterName: 'associationType',
      filterable: getDistinctFieldValue(supplementalData, 'associationType'),
      filterType: 'checkbox',
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifiers',
      headerStyle: { width: '150px' },
      formatter: qualifiers => <DiseaseQualifiersColumn qualifiers={qualifiers}/>,
      filterable: getDistinctFieldValue(supplementalData, 'diseaseQualifiers'),
      filterName: 'diseaseQualifier',
      filterType: 'checkbox',
    },
    {
      dataField: 'disease',
      text: 'Disease',
      headerStyle: { width: '150px' },
      formatter: (curie, row) => <DiseaseLinkCuration disease={row.object} />,
      filterable: true,
    },
    {
      dataField: 'conditionModifierList',
      text: 'Condition Modifier',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
      filterName: "conditionModifier",
      filterable: true,
    },
    {
      dataField: 'geneticModifierList',
      text: 'Genetic Modifier',
      formatter: (modifiers, row) => <GeneticModifiersCellCuration relation={row.geneticModifierRelation} modifiers={modifiers} />,
      headerStyle: {width: '220px'},
      filterName: "geneticModifier",
      filterable: true,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      headerStyle: {width: '100px'},
      filterName: 'evidenceCode',
      formatter: (codes) => <EvidenceCodesCellCuration evidenceCodes={codes}/>,
      filterable: true,
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      headerStyle: { width: '100px' },
      filterName: 'dataProvider',
      filterable: true,
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      formatter: (pubModIds) => <ReferencesCellCuration pubModIds={pubModIds}/>,
      headerStyle: {width: '150px'},
      filterName: 'reference',
      filterable: true,
    }
  ];

  const data = results.map(association => ({
    species: association.subject?.species,
    providers: buildProvidersWithUrl(association.primaryAnnotations),
    ...association,
  }));

  const sortOptions = [
    {
      value: 'disease',
      label: 'Disease',
    },
    {
      value: 'model',
      label: 'Model',
    },
    {
      value: 'species',
      label: 'Species',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={`/api/disease/${id}/models/download`}
      keyField='primaryKey'
      sortOptions={sortOptions}
    />
  );
};

DiseaseToModelTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToModelTable;
