import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable } from '../../../components/dataTable';
import useDataTableQuery from '../../../hooks/useDataTableQuery';

const createReferenceTable = ({ endpoint, transform, columns, displayName, supportsCrossReferences = false }) => {
  const Table = ({ id, crossReferences = [] }) => {
    const hasXrefs = crossReferences.length > 0;
    const queryParams =
      supportsCrossReferences && hasXrefs ? `?crossReferences=${encodeURIComponent(crossReferences.join(','))}` : '';
    const tableQuery = useDataTableQuery(`/api/reference/${id}/${endpoint}${queryParams}`, {
      enabled: !supportsCrossReferences || hasXrefs,
    });
    const data = (tableQuery.data || []).map((record) => ({
      ...transform(record),
      id: hash(record),
    }));
    return <DataTable {...tableQuery} data={data} columns={columns} keyField="id" />;
  };

  Table.displayName = displayName;
  Table.propTypes = {
    id: PropTypes.string.isRequired,
    ...(supportsCrossReferences ? { crossReferences: PropTypes.arrayOf(PropTypes.string) } : {}),
  };
  return Table;
};

export default createReferenceTable;
