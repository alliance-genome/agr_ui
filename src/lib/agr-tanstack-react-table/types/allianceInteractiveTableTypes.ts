import { type DeepKeysMaxDepth, type DeepKeysOfObjectArrayTypes } from './deepKeys';
import { type TypeOrArrayType } from './arrays';
import { type TypeByPath } from './typeByPath';
import { type Cell, type CoreRow, type Row, type RowData } from '@tanstack/react-table';

export type ChildRowKeys<TData> = Extract<DeepKeysMaxDepth<TData>, DeepKeysOfObjectArrayTypes<TData>> & string;

export type ChildRowType<TData> = TypeOrArrayType<TypeByPath<TData, ChildRowKeys<TData>>>;

export interface ChildRowEnabledRow<TData> extends Row<TData>, ChildRowEnabledCoreRow<TData> {}

export interface ChildRowEnabledRowModel<TData> {
  rows: ChildRowEnabledRow<TData>[];
  flatRows: ChildRowEnabledRow<TData>[];
  rowsById: Record<string, ChildRowEnabledRow<TData>>;
}

export interface ChildRowEnabledCoreRow<TData extends RowData> extends CoreRow<TData> {
  childRows: ChildRowEnabledRow<ChildRowType<TData>>[];
  originalChildRows: ChildRowType<TData>[];
  parentObjectId?: string;
  getParentObjectRow: () => ChildRowEnabledRow<TData> | undefined;
  getParentObjectRows: () => ChildRowEnabledRow<TData>[];
  childDepth: number;
  totalChildRows: number;
  getLeafChildRows: () => ChildRowEnabledRow<TData>[];
  rootChildPath?: ChildRowKeys<TData>;
  getVisibleLeafCells: () => Cell<TData, unknown>[];
}
