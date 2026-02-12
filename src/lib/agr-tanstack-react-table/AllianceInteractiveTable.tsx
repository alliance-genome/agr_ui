import React, { type ReactNode, use, useCallback, useState } from 'react';
import {
  type Cell,
  type Column,
  type ColumnDef,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowData,
} from '@tanstack/react-table';
import { useChildRowEnabledReactTable } from './getChildRowEnabledCoreRowModel';
import useAllianceInteractiveTableSettings from './hooks/useAllianceInteractiveTableSettings.ts';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import './allianceInteractiveTable.scss';
import classNames from 'classnames';
import DropdownButton from './components/DropdownButton';
import { type ChildRowEnabledRow } from './types';
import CaretLeftIcon from './icons/CaretLeftIcon';
import CaretRightIcon from './icons/CaretRightIcon';
import TableSortableContext from './components/TableSortableContext.tsx';
import TableHeader from './components/TableHeader.tsx';
import TableCell from './components/TableCell.tsx';
import DownloadButton from '../../components/dataTable/downloadButton';
import { DOWNLOAD_BUTTON_THRESHOLD } from '../../constants';
import { type DefinedInitialDataOptions, keepPreviousData, useQuery } from '@tanstack/react-query';
import fetchData from '../fetchData';
import PaginationCountAndDropdown from '@agr-tanstack-react-table/components/PaginationCountAndDropdown.tsx';
import PageSelector from '@agr-tanstack-react-table/components/PageSelector.tsx';
import { sectionAnchor } from '../../containers/allelePage/AlleleMolecularConsequences';

export type InteractiveTableQueryProps = {
  baseUrl: string;
  config?: Partial<DefinedInitialDataOptions<unknown, Error, unknown, readonly unknown[]>>;
  fetchOptions?: Partial<{
    type: string;
    signal: string;
    data: { [key: string]: any };
  }>;
  fetchTimeout?: number;
};

type InteractiveTableProps<DataType> = {
  id: string;
  columns: ColumnDef<DataType, unknown>[];
  data: DataType[];
  totalText?: string;
  fullWidth?: boolean;
  showColumnLines?: boolean;
  showHiddenColumnText?: boolean;
  useHorizontalScrollArrows?: boolean;
  useResetButton?: boolean;
  useColumnVisibility?: boolean;
  useLocalStorageForTableState?: boolean;
  useHeaderSorting?: boolean;
  ExpandedRowComponent?: ({ rowData }: { rowData: DataType }) => React.ReactNode;
  download?: {
    url?: string;
    method?: string;
    body?: any;
  };
  query?: InteractiveTableQueryProps;
  sortable?: boolean;
};

type MultiTextInputFilterValue = {
  pills: string[];
  inputText: string;
};

export const getDisplayName = <TData,>(column: Column<TData>) => {
  if (column.columnDef.meta?.displayName) return column.columnDef.meta.displayName;
  if (typeof column.columnDef.header === 'string') return column.columnDef.header;
  return column.id;
};

const AllianceInteractiveTable = <TData extends RowData>({
  id,
  columns,
  data,
  totalText = 'total',
  fullWidth = false,
  showColumnLines = false,
  showHiddenColumnText = false,
  useResetButton = false,
  useHorizontalScrollArrows = false,
  useColumnVisibility = false,
  useLocalStorageForTableState = false,
  useHeaderSorting = false,
  ExpandedRowComponent,
  download,
  query: queryProps,
  sortable = false,
}: InteractiveTableProps<TData>): ReactNode => {
  const [queryKeys, setQueryKeys] = useState<unknown[]>([]);
  const [queryParams, setQueryParams] = useState('');

  const useFrontendLogic = queryProps === undefined;

  const query = useQuery({
    enabled: !useFrontendLogic,
    queryKey: [queryProps?.baseUrl, ...queryKeys],
    queryFn: () => fetchData(queryProps?.baseUrl + queryParams, queryProps?.fetchOptions, queryProps?.fetchTimeout),
    placeholderData: keepPreviousData,
    ...(queryProps?.config ? queryProps.config : {}),
  });

  const table = useChildRowEnabledReactTable({
    columns,
    data: useFrontendLogic ? data : ((query.data as { results: TData[] })?.results ?? []),
    ...(!useFrontendLogic
      ? {
          rowCount: (query.data as { total: number })?.total,
          manualPagination: true,
          manualSort: true,
          manualFiltering: true,
        }
      : {}),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: (_) => true,
    getExpandedRowModel: getExpandedRowModel(),
    enableSorting: sortable,
    defaultColumn: {
      enableSorting: false,
      filterFn: (row, columnId, filterValue) => {
        filterValue = filterValue as MultiTextInputFilterValue;
        const values = [...filterValue.pills, ...(filterValue.inputText === '' ? [] : [filterValue.inputText])];

        for (let i = 0; i < values.length; i++) {
          if (!((row.getValue(columnId) || '') as string).toLowerCase().includes(values[i].toLowerCase())) {
            return false;
          }
        }
        return true;
      },
    },
  });

  const initialSettings = {
    columnOrder: table.getAllLeafColumns().map((c) => c.id),
    columnVisibility: Object.fromEntries(
      table
        .getAllFlatColumns()
        .map((column) => [
          column.id,
          useColumnVisibility
            ? column.columnDef.meta?.defaultVisibility
              ? column.columnDef.meta.defaultVisibility === 'visible'
              : true
            : true,
        ])
    ),
  };

  const { resetTableState } = useAllianceInteractiveTableSettings(
    id,
    table,
    initialSettings,
    useLocalStorageForTableState,
    setQueryKeys,
    setQueryParams
  );

  const [horizontalScrollEnabled, setHorizontalScrollEnabled] = useState(false);
  const [tableContainerElement, setTableContainerElement] = useState<HTMLDivElement | null>(null);

  const tableWrapperRef = useCallback((container: HTMLDivElement) => {
    if (!container) return;

    const observer = new ResizeObserver(() => {
      setHorizontalScrollEnabled(container.scrollWidth !== container.clientWidth);
    });

    observer.observe(container);
    setTableContainerElement(container);

    let showLeftShadow = false;
    let showRightShadow = false;

    const onScroll = () => {
      showLeftShadow = container.scrollLeft !== 0;
      showRightShadow = container.scrollLeft !== container.scrollWidth - container.clientWidth;

      container.className = classNames('table-wrapper', {
        'show-left-shadow': showLeftShadow,
        'show-right-shadow': showRightShadow,
      });
    };

    onScroll();
    container.addEventListener('scroll', onScroll);
  }, []);

  const onHorizontalScroll = (direction: 'left' | 'right') => {
    if (!tableContainerElement) return;

    const totalWidth = tableContainerElement.clientWidth;
    const scrollLimit = tableContainerElement.scrollWidth - totalWidth;
    const currentScrollPosition = tableContainerElement!.scrollLeft;

    if (direction === 'left') {
      tableContainerElement.scrollLeft = Math.max(0, currentScrollPosition - totalWidth);
    } else {
      tableContainerElement.scrollLeft = Math.min(scrollLimit, currentScrollPosition + totalWidth);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.5,
      },
    })
  );

  if (JSON.stringify(table.getState()) === '{}') return null;

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      table.setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sortableColumns = table.getAllLeafColumns().filter((column) => column.getCanSort());

  const showUpperToolbar = sortableColumns.length > 0 || useResetButton || useColumnVisibility || showHiddenColumnText;

  const downloadDisabled = table.getRowCount() > DOWNLOAD_BUTTON_THRESHOLD;

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className={classNames('interactive-table', { 'full-width': fullWidth })}>
        {horizontalScrollEnabled && useHorizontalScrollArrows && (
          <div className="horizontal-scroll-arrows">
            <button className="scroll-left" onClick={() => onHorizontalScroll('left')}>
              <CaretLeftIcon />
            </button>
            <button className="scroll-right" onClick={() => onHorizontalScroll('right')}>
              <CaretRightIcon />
            </button>
          </div>
        )}
        {showUpperToolbar && (
          <div className="main-toolbar">
            <section className="left-side">
              {useResetButton && (
                <button className="reset-button" onClick={() => resetTableState()}>
                  Reset
                </button>
              )}
              {useColumnVisibility && (
                <DropdownButton text="Show/Hide Columns">
                  <ul className="show-hide-list">
                    {table.getAllColumns().map((column) => (
                      <li key={column.id}>
                        <label className="parent-column">
                          <input
                            type="checkbox"
                            checked={
                              column.columns.length > 0
                                ? column.columns.map((subColumn) => subColumn.getIsVisible()).reduce((a, b) => a || b)
                                : column.getIsVisible()
                            }
                            onChange={(e) => {
                              const checked = e.target.checked;
                              table.setColumnVisibility((old) => ({
                                ...old,
                                ...(column.columns.length > 0
                                  ? Object.fromEntries(column.columns.map((column) => [column.id, checked]))
                                  : { [column.id]: checked }),
                              }));
                            }}
                          />
                          {getDisplayName(column)}
                        </label>
                        <ul className="child-columns">
                          {column.columns.map((subColumn) => (
                            <li key={subColumn.id}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={subColumn.getIsVisible()}
                                  onChange={(_) => subColumn.toggleVisibility()}
                                />
                                {getDisplayName(subColumn)}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </DropdownButton>
              )}
              {showHiddenColumnText &&
                table.getAllLeafColumns().length !==
                  table.getAllLeafColumns().filter((c) => c.getIsVisible()).length && (
                  <span className="hidden-columns">
                    Hidden columns:{' '}
                    {table
                      .getAllLeafColumns()
                      .filter((column) => !column.getIsVisible())
                      .map((column) => getDisplayName(column))
                      .join(', ')}
                  </span>
                )}
            </section>
            <section className="right-side">
              {!useHeaderSorting && sortableColumns.length > 0 && (
                <section className="sort-dropdown">
                  <label htmlFor={`${id}-sort-dropdown`}>Sort by</label>
                  <select
                    id={`${id}-sort-dropdown`}
                    value={table.getState().sorting[0].id}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        table.setSorting((_) => [{ id: '', desc: false }]);
                      } else {
                        table.getColumn(e.target.value)?.toggleSorting();
                      }
                    }}
                  >
                    <option value="">Default</option>
                    {sortableColumns.map((column, index) => (
                      <option value={column.id} key={`${id}-sort-option-${column.id}-${index}`}>
                        {getDisplayName(column)}
                      </option>
                    ))}
                  </select>
                </section>
              )}
            </section>
          </div>
        )}
        <div className="table-wrapper" ref={tableWrapperRef}>
          <table className={classNames({ 'full-width': fullWidth })}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="group-header">
                  <TableSortableContext table={table}>
                    {headerGroup.headers.map((header) => (
                      <TableHeader
                        header={header}
                        key={header.id}
                        useHeaderSorting={useHeaderSorting}
                        supplementalData={(query.data as any)?.supplementalData}
                      />
                    ))}
                  </TableSortableContext>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                const getSubRows = (rowToRender: ChildRowEnabledRow<TData>) => {
                  const parentCells = rowToRender.getVisibleCells();

                  if (rowToRender.childRows.length === 0) return [parentCells];
                  const childCells: Cell<TData, unknown>[][] = rowToRender.childRows
                    .map((childRow) => getSubRows(childRow as ChildRowEnabledRow<TData>))
                    .reduce((p, c) => p.concat(c));
                  const combinedCells = [...childCells];
                  combinedCells[0] = parentCells.concat(childCells[0]);
                  return combinedCells.map((subRowCells) =>
                    subRowCells.sort((aCell, bCell) => aCell.column.getIndex() - bCell.column.getIndex())
                  );
                };

                const subRowsOfCells = getSubRows(row as ChildRowEnabledRow<TData>);

                return (
                  <React.Fragment key={row.id}>
                    {subRowsOfCells.map((subRowCells, rowIndex) => (
                      <tr key={`${row.id}-${rowIndex}`} className={classNames({ 'first-of-group': rowIndex === 0 })}>
                        <SortableContext items={table.getState().columnOrder} strategy={horizontalListSortingStrategy}>
                          {subRowCells.map((cell, cellIndex) => (
                            <React.Fragment key={`${row.id}-${rowIndex}-${cellIndex}`}>
                              {/*<DragAlongCell cell={cell} key={cell.id} showColumnLines={showColumnLines} />*/}
                              <TableCell cell={cell} key={cell.id} showColumnLines={showColumnLines} />
                            </React.Fragment>
                          ))}
                        </SortableContext>
                      </tr>
                    ))}
                    {ExpandedRowComponent && row.getIsExpanded() && (
                      <tr>
                        <td colSpan={row.getAllCells().length}>
                          <ExpandedRowComponent rowData={row.original} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <section className="bottom-toolbar">
          <PaginationCountAndDropdown table={table} />
          <PageSelector table={table} />
        </section>
        {download?.url && (
          <DownloadButton
            downloadUrl={download.url}
            disabled={downloadDisabled}
            method={download.method}
            body={download.body}
          />
        )}
      </div>
    </DndContext>
  );
};

export default AllianceInteractiveTable;
