import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  EvidenceCodesCell,
  ReferenceCell,
  SpeciesCell
} from '../../components/dataTable';
import ExperimentalConditionCellCuration from '../../components/dataTable/ExperimentalConditionCellCuration';
import ExternalLink from '../../components/ExternalLink';
import {getDistinctFieldValue, buildProvidersWithUrl, extractConditionRelations } from '../../components/dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import SpeciesName from '../../components/SpeciesName';
import AssociationType from '../../components/AssociationType';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';

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
      formatter: (subject, row) => (
        <>
          <div>
            <ExternalLink href={subject.modCrossRefCompleteUrl}>
              <span dangerouslySetInnerHTML={{__html: subject.name}} />
            </ExternalLink>
          </div>
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
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '105px'},
    },
    {
      dataField: 'experimentalConditions',
      text: 'Experimental condition',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'associationType',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'disease',
      text: 'Disease',
      headerStyle: { width: '150px' },
      formatter: (curie, row) => <DiseaseLinkCuration disease={row.object} />,
      filterable: true,
    },
    {
      dataField: 'conditionModifiers',
      text: 'Condition Modifier',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: codes => <EvidenceCodesCell evidenceCodes={codes} />,
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'dataProvider',
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

  const data = results.map(association => ({
    species: association.subject?.species,
    providers: buildProvidersWithUrl(association.primaryAnnotations),
    experimentalConditions: extractConditionRelations(association.primaryAnnotations, new Set(["has_condition", "induced_by"])),
    conditionModifiers: extractConditionRelations(association.primaryAnnotations, 
      new Set(["ameliorated_by", "not_ameliorated_by", "exacerbated_by", "not_exacerbated_by"])),
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
