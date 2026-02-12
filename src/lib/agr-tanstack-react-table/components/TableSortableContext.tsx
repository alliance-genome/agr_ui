import type { RowData, Table } from '@tanstack/react-table';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { type ReactNode } from 'react';

type TableSortableContextProps<TData> = {
  table: Table<TData>;
  children: ReactNode;
};

const TableSortableContext = <TData extends RowData>({ table, children }: TableSortableContextProps<TData>) => (
  <SortableContext items={table.getState().columnOrder} strategy={horizontalListSortingStrategy}>
    {children}
  </SortableContext>
);

export default TableSortableContext;
