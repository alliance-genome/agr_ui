import '@tanstack/react-table';
import { CellContext, RowData } from '@tanstack/react-table';
import {
  DeepKeysOfObjectArrayTypes,
  TypeByPath,
} from './components/interactive-tables/SplitSystemCombinationSearchTable';
import { DeepKeysMaxDepth, TypeOrArrayType } from './types';
import type { ReactNode } from 'react';

export type ChildCellContext<ParentType, ChildType> = Omit<CellContext<ParentType>, 'row'> & {
  row: Omit<CellContext<ParentType>['row'], 'original'> & {
    original: ChildType;
    totalChildRows: number;
  };
};

export type ChildPath<TData> = Extract<DeepKeysMaxDepth<TData>, DeepKeysOfObjectArrayTypes<TData>>;
export type ChildType<TData> = TypeOrArrayType<TypeByPath<TData, ChildPath<TData> & string>>;

declare module '@tanstack/react-table' {
  interface ColumnMeta<
    TData extends RowData,
    TValue,
    TChildPath = ChildPath<TData>,
    TChildType extends RowData = ChildType<TData>,
  > {
    childRow?: {
      path: TChildPath;
      cell: string | ((props: ChildCellContext<TData, TChildType>) => any);
    };
    displayName?: string;
    align?: 'left' | 'center' | 'right';
    nowrap?: boolean;
    defaultVisibility?: 'visible' | 'hidden';
    width?: string;
    headerTooltip?: ReactNode;
    sortKey?: string;
    filterKey?: string;
    filterOptions?: string[];
    filterFormatter?: (value: string) => ReactNode;
  }
}
