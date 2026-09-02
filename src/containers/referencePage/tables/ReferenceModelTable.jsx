import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable, SpeciesCell } from '../../../components/dataTable';
import useDataTableQuery from '../../../hooks/useDataTableQuery';
import ModelCellCuration from '../../../components/dataTable/ModelCellCuration.jsx';

const ReferenceModelTable = ({ id }) => {
  const { data: results, ...tableProps } = useDataTableQuery(`/api/reference/${id}/models`);
  const data = (results || []).map((record) => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'species',
      text: 'Species',
      formatter: (_v, row) => row.model?.taxon && <SpeciesCell taxon={row.model.taxon} />,
      headerStyle: { width: '130px' },
    },
    {
      dataField: 'model',
      text: 'Model name',
      formatter: (model) => <ModelCellCuration model={model} />,
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
