import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable } from '../../components/dataTable';
import ExternalLink from '../../components/ExternalLink';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import DiseaseLink from '../../components/disease/DiseaseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AssociationType from '../../components/AssociationType';
import ExperimentalConditionCell from '../../components/dataTable/ExperimentalConditionCell';

const GeneModelsTable = ({id}) => {
  const tableQuery = useDataTableQuery(`/api/gene/${id}/models`);
  const data = (tableQuery.data || []).map(record => ({
    ...record,
    key: hash(record)
  }));

  const columns = [
    {
      dataField: 'name',
      text: 'Model name',
      formatter: (name, row) => (
        <ExternalLink href={row.url}>
          <span dangerouslySetInnerHTML={{__html: name}} />
        </ExternalLink>
      ),
      filterable: true,
      filterName: 'modelName',
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'conditions',
      text: 'Experimental condition',
      formatter: conditions => <ExperimentalConditionCell conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'diseaseModels',
      text: 'Associated Human Diseases',
      formatter: diseaseModels => diseaseModels && (
        <CollapsibleList collapsedSize={diseaseModels.length}>
          {diseaseModels.map(diseaseModel => (
            <div key={diseaseModel.associationType + diseaseModel.disease.id}>
              <AssociationType type={diseaseModel.associationType} showOnlyNot />{' '}
              <DiseaseLink disease={diseaseModel.disease} />
            </div>
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'disease',
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'phenotypes',
      text: 'Associated Phenotypes',
      formatter: phenotypes => phenotypes && (
        <CollapsibleList collapsedSize={2} showBullets>
          {phenotypes.map(phenotype => (
            <span dangerouslySetInnerHTML={{__html: phenotype}} key={phenotype} />
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'phenotype',
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'conditionModifiers',
      text: 'Modifier',
      formatter: conditions => <ExperimentalConditionCell conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source && source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
  ];

  return (
    <DataTable
      {...tableQuery}
      data={data}
      columns={columns}
      keyField='key'
    />
  );
};

GeneModelsTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneModelsTable;
