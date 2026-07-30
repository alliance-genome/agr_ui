import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable } from '../../../components/dataTable';
import useDataTableQuery from '../../../hooks/useDataTableQuery';
import CollapsibleList from '../../../components/collapsibleList/collapsibleList.jsx';
import AssociationType from '../../../components/AssociationType.jsx';
import DiseaseLinkCuration from '../../../components/disease/DiseaseLinkCuration.jsx';
import ModelCellCuration from '../../../components/dataTable/ModelCellCuration.jsx';

const ReferenceModelTable = ({ id }) => {
  const { data: results, ...tableProps } = useDataTableQuery(`/api/reference/${id}/models`);
  const data = (results || []).map((record) => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'model',
      text: 'Model name',
      formatter: (model) => <ModelCellCuration model={model} />,
      headerStyle: { width: '220px' },
    },
    {
      dataField: 'diseaseModels',
      text: 'Associated Human Diseases',
      formatter: (diseaseModels) =>
        diseaseModels && (
          <CollapsibleList collapsedSize={diseaseModels.length}>
            {diseaseModels.map((diseaseModel) => (
              <div key={(diseaseModel.associationType || '') + (diseaseModel.disease?.curie || '')}>
                <AssociationType type={diseaseModel.associationType} showOnlyNot />{' '}
                <DiseaseLinkCuration disease={diseaseModel.disease} />
              </div>
            ))}
          </CollapsibleList>
        ),
      headerStyle: { width: '230px' },
    },
    {
      dataField: 'associatedPhenotype',
      text: 'Associated Phenotypes',
      formatter: (associatedPhenotype) =>
        associatedPhenotype && (
          <CollapsibleList collapsedSize={2} showBullets>
            {associatedPhenotype.map((phenotype) => (
              <span dangerouslySetInnerHTML={{ __html: phenotype }} key={phenotype} />
            ))}
          </CollapsibleList>
        ),
      headerStyle: { width: '220px' },
    },
    {
      dataField: 'dataProvider',
      text: 'Source',
      formatter: (dataProvider) => dataProvider,
      headerStyle: { width: '100px' },
    },
  ];

  return <DataTable {...tableProps} data={data} columns={columns} keyField="id" />;
};

ReferenceModelTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReferenceModelTable;
