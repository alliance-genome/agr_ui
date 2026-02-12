import type { RowData, Table } from '@tanstack/react-table';

type PaginationCountAndDropdownProps<TData extends RowData> = {
  table: Table<TData>;
};

const PaginationCountAndDropdown = <TData extends RowData>({ table }: PaginationCountAndDropdownProps<TData>) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const firstVisibleRowTotalIndex = pageIndex * pageSize + 1;
  const lastVisibleRowTotalIndex = Math.min(firstVisibleRowTotalIndex + pageSize - 1, table.getRowCount());

  return (
    <label className="pagination-count-and-dropdown">
      Showing {firstVisibleRowTotalIndex} - {lastVisibleRowTotalIndex} of {table.getRowCount()} rows
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => table.setPageSize(parseInt(e.target.value))}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="100">100</option>
      </select>
      per page
    </label>
  );
};

export default PaginationCountAndDropdown;
