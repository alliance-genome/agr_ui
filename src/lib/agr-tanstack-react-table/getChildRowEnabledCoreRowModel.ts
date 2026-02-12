import {
  type RowData,
  type Table,
  createRow,
  memo,
  getMemoOptions,
  useReactTable,
  type TableOptions,
} from '@tanstack/react-table';
import type { ChildRowEnabledRow, ChildRowEnabledRowModel, ChildRowKeys, ChildRowType, TypeByPath } from './types';
import { getByPath } from './helpers/getByPath';

/*
 * This files heavily borrows from tan stack tables built-in getCoreRowModel function
 * It adds the ability to have "child rows" along with some functionality based on of
 * this relationship.
 *
 * While tan stack table does have "sub rows", these must be the same type as the parent row. The idea is that you may
 * have something like a summary row that encapsulates multiple entries, each of which would be a sub row. All the
 * columns would be the same type, just retried differently.
 *
 * In our case, we want the ability to have columns dedicated to child data types within the parent object. For example,
 * Split System Combinations contain component alleles. We want 1 table that has columns for the SSC data type AND the
 * allele datatype. We then use row spans to group together all the alleles under 1 SSC.
 *
 * Child rows can be any type that is a descendant of the original parent type, provided it is in an array. This allows
 * for displaying of 1 to many relationships within an HTML table structure.
 *
 * This model also interfaces with custom types, and the createChildRowEnabledHelper function to allow for easy integration
 * of child data types into the tan stack table library.
 * */

export function getChildRowEnabledCoreRowModel<
  TData extends RowData,
  TableType extends RowData = TData | ChildRowType<TData>,
>(): (table: Table<TableType>) => () => ChildRowEnabledRowModel<TableType> {
  return (table) =>
    memo(
      () => [table.options.data],
      (
        data
      ): {
        rows: ChildRowEnabledRow<TableType>[];
        flatRows: ChildRowEnabledRow<TableType>[];
        rowsById: Record<string, ChildRowEnabledRow<TableType>>;
      } => {
        const rowModel: ChildRowEnabledRowModel<TableType> = {
          rows: [],
          flatRows: [],
          rowsById: {},
        };

        const childRowPaths = table
          .getAllFlatColumns()
          .map((column) => column.columnDef.meta?.childRow?.path)
          .filter((path) => path !== undefined)
          .filter((path, index, array) => array.indexOf(path) === index)
          .map((path) => path as ChildRowKeys<TableType>)
          .sort((a, b) => a.length - b.length);

        const accessRows = <SpecificRowType extends TableType>(
          originalRows: SpecificRowType[],
          depth = 0,
          childDepth = 0,
          parentRow?: ChildRowEnabledRow<TableType>,
          parentObjectRow?: ChildRowEnabledRow<TableType>,
          childPaths?: ChildRowKeys<SpecificRowType>[],
          rootChildPath?: ChildRowKeys<TableType>
        ): ChildRowEnabledRow<TableType>[] => {
          const rows = [] as ChildRowEnabledRow<TableType>[];
          const childPath = childPaths && childPaths.length > 0 ? childPaths[0] : undefined;

          for (let i = 0; i < originalRows.length; i++) {
            // Make the row using the build in function
            let row = createRow(
              table,
              table._getRowId(originalRows[i]!, i, parentRow),
              originalRows[i]!,
              i,
              depth,
              undefined,
              parentRow?.id
            ) as ChildRowEnabledRow<TableType>;

            let originalChildRows = [] as TypeByPath<SpecificRowType, ChildRowKeys<SpecificRowType>>;
            if (childPath !== undefined) originalChildRows = getByPath(originalRows[i], childPath);

            if (!Array.isArray(originalChildRows)) {
              throw new Error(
                'Something has gone wrong. Somehow the type located by childPath is not an array. This error should never throw, but if it does, the typing for childPath must be incorrect.'
              );
            }

            const newChildPaths =
              childPath && childPaths
                ? childPaths.slice(1).map((path) => path.substring(childPath.length + 1))
                : undefined;

            const childRows =
              originalChildRows.length > 0
                ? (accessRows(
                    originalChildRows,
                    0,
                    childDepth + 1,
                    row,
                    parentRow,
                    newChildPaths,
                    `${rootChildPath ? rootChildPath + '.' : ''}${childPath}` as ChildRowKeys<TableType>
                  ) as ChildRowEnabledRow<ChildRowType<TableType>>[])
                : [];

            // add/modify the row object to include new abilities
            row = {
              ...row,
              childRows,
              originalChildRows,
              childDepth,
              totalChildRows:
                childRows.length > 0
                  ? childRows
                      .map((childRow) => childRow.totalChildRows)
                      .reduce((p, c) => (p === 0 ? 1 : p) + (c === 0 ? 1 : c))
                  : 0,
              parentObjectId: parentObjectRow ? parentObjectRow.id : undefined,
              getParentObjectRow: () =>
                row.parentObjectId
                  ? (table.getRow(row.parentObjectId, true) as ChildRowEnabledRow<TableType>)
                  : undefined,
              getParentObjectRows: () => {
                let parentRows = [];
                let currentRow = row;
                while (true) {
                  const parentObjectRow = currentRow.getParentObjectRow();
                  if (parentObjectRow === undefined) break;
                  parentRows.push(parentObjectRow);
                  currentRow = parentObjectRow;
                }
                return parentRows.reverse();
              },
              rootChildPath,
              getLeafChildRows: () => {
                const getChildRows = (r: ChildRowEnabledRow<TableType>) => {
                  let childRows = r.childRows;
                  childRows.forEach((childRow) => {
                    childRows = childRows.concat(getChildRows(childRow as ChildRowEnabledRow<TableType>));
                  });
                  return childRows;
                };
                return getChildRows(row) as ChildRowEnabledRow<TableType>[];
              },
            };

            // By default, getVisibleCells will return all cells (including child rows),
            // not just the cells for the parent row
            row.getVisibleLeafCells = row.getVisibleCells;

            row.getVisibleCells = memo(
              () => [row.getLeftVisibleCells(), row.getCenterVisibleCells(), row.getRightVisibleCells()],
              (left, center, right) =>
                [...left, ...center, ...right]
                  .map((cell) => ({
                    ...cell,
                    row,
                    getContext: memo(
                      () => [table, cell.column, row, cell],
                      (table, column, row, cell) => ({
                        table,
                        column,
                        row,
                        cell,
                        getValue: cell.getValue,
                        renderValue: cell.renderValue,
                      }),
                      getMemoOptions(table.options, 'debugCells', 'cell.getContext')
                    ),
                  }))
                  .filter((cell) => cell.column.columnDef.meta?.childRow?.path === rootChildPath),
              getMemoOptions(table.options, 'debugRows', 'getVisibleCells')
            );

            // Keep track of every row in a flat array
            rowModel.flatRows.push(row);
            // Also keep track of every row by its ID
            rowModel.rowsById[row.id] = row;
            // Push table row into parent
            rows.push(row);

            // Get the original subrows
            if (table.options.getSubRows) {
              row.originalSubRows = table.options.getSubRows(originalRows[i]!, i);

              // Then recursively access them
              if (row.originalSubRows?.length) {
                row.subRows = accessRows(row.originalSubRows, depth + 1, childDepth, parentObjectRow, row);
              }
            }
          }

          return rows;
        };

        rowModel.rows = accessRows(data, 0, 0, undefined, undefined, childRowPaths);

        return rowModel;
      },
      getMemoOptions(table.options, 'debugTable', 'getRowModel', () => table._autoResetPageIndex())
    );
}

export const useChildRowEnabledReactTable = <TData extends RowData>(
  options: Omit<TableOptions<TData>, 'getCoreRowModel'>
) => {
  let table = useReactTable({
    ...options,
    getCoreRowModel: getChildRowEnabledCoreRowModel(),
  });

  // Casting here saves the user from having to do it manually (though they still need to in places)
  // TypeScript is not smart enough to know that we are using a more-specific type
  table.getCoreRowModel = table.getCoreRowModel as () => ChildRowEnabledRowModel<TData>;
  table.getRowModel = table.getRowModel as () => ChildRowEnabledRowModel<TData>;
  return table;
};
