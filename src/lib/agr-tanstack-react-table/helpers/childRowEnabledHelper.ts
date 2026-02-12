import type { AccessorFnColumnDef, ColumnHelper, ColumnMeta, RowData } from '@tanstack/react-table';
import type { DeepKeysMaxDepth, TypeByPath, TypeOrArrayType, ChildCellContext, ChildPath } from '../types';
import type { AccessorFn } from '@tanstack/table-core';
import { CONCATENATION_DELIMITER } from './constants';
import { createColumnHelper } from '@tanstack/react-table';
import { getAllByPath } from '../helpers';

export type ChildRowEnabledHelper<TData> = ColumnHelper<TData> & {
  childAccessor: <
    TChildPath extends DeepKeysMaxDepth<TData> = ChildPath<TData>,
    TChildType = TypeOrArrayType<TypeByPath<TData, TChildPath & string>>,
    TChildAccessorKeyOrFunction = AccessorFn<TChildType> | DeepKeysMaxDepth<TChildType>,
  >(
    childPath: TChildPath,
    childAccessorKeyOrFunction: TChildAccessorKeyOrFunction,
    childColumnDef: Omit<AccessorFnColumnDef<TData>, 'cell' | 'accessorFn' | 'meta'> & {
      cell?: string | ((props: ChildCellContext<TData, TChildType>) => any);
      meta?: Omit<ColumnMeta<TData, unknown>, 'childRow'>;
    }
  ) => AccessorFnColumnDef<TData>;
};

export const createChildRowEnabledHelper = <TData extends RowData>() => {
  const originalHelper = createColumnHelper<TData>();

  const newHelper: ChildRowEnabledHelper<TData> = {
    ...originalHelper,
    childAccessor: (childPath, childAccessorKeyOrFunction, childColumnDef) => ({
      ...childColumnDef,
      id:
        typeof childAccessorKeyOrFunction === 'function'
          ? childPath + '.' + childColumnDef.id!
          : childPath + '.' + childAccessorKeyOrFunction,
      cell: (_props) => null,
      accessorFn: (row: TData) => {
        const children = getAllByPath(row, childPath);

        /*
         * This check is needed because, for some reason, child rows get passed to accessor functions as well,
         * meaning we need to ignore child rows in the logic.
         * */
        if (!Array.isArray(children)) {
          return '';
        }

        const childAccessorValues = children.map((item, index) =>
          typeof childAccessorKeyOrFunction === 'function'
            ? childAccessorKeyOrFunction(item, index)
            : typeof childAccessorKeyOrFunction === 'string'
              ? item[childAccessorKeyOrFunction as keyof typeof item]
              : ''
        );

        return childAccessorValues.join(CONCATENATION_DELIMITER);
      },
      meta: {
        ...childColumnDef.meta,
        exportFn: undefined,
        childRow: {
          path: childPath,
          cell: childColumnDef.cell || ((_props) => null),
        },
      },
    }),
  };

  return newHelper;
};
