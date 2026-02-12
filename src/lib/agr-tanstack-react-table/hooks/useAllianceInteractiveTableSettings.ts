import useSmartStorage from './useSmartStorage';
import { type RowData, type Table, type TableState } from '@tanstack/react-table';
import { useEffect, useReducer } from 'react';
import { stringify } from 'qs';

const DEFAULT_TABLE_STATE: TableState = {
  columnFilters: [],
  columnOrder: [],
  columnPinning: { left: [], right: [] },
  columnSizing: {},
  columnSizingInfo: {
    columnSizingStart: [],
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: false,
    startOffset: null,
    startSize: null,
  },
  columnVisibility: {},
  expanded: {},
  grouping: [],
  pagination: { pageIndex: 0, pageSize: 10 },
  rowPinning: { top: [], bottom: [] },
  rowSelection: {},
  sorting: [{ id: '', desc: false }],
  globalFilter: null,
};

export const getDefaultSettingsForTable = <TData extends RowData>(
  table: Table<TData>,
  userDefaults: Partial<TableState>
): TableState =>
  overrideSettings(DEFAULT_TABLE_STATE, {
    columnOrder: table.getAllLeafColumns().map((c) => c.id),
    ...userDefaults,
    columnVisibility: {
      ...Object.fromEntries(table.getAllLeafColumns().map((col) => [col.id, true])),
      ...userDefaults.columnVisibility,
    },
  });

const overrideSettings = (defaultSettings: TableState, localSettings: Partial<TableState>): TableState => ({
  ...defaultSettings,
  ...localSettings,
  columnPinning: {
    ...defaultSettings.columnPinning,
    ...localSettings.columnVisibility,
  },
  pagination: {
    ...defaultSettings.pagination,
    ...localSettings.pagination,
  },
  rowPinning: {
    ...defaultSettings.rowPinning,
    ...localSettings.rowPinning,
  },
  columnVisibility: {
    ...defaultSettings.columnVisibility,
    ...localSettings.columnVisibility,
  },
});

const sanitizeLocalSettings = <TData extends RowData>(
  table: Table<TData>,
  localDefaults: Partial<TableState>
): Partial<TableState> => {
  const columnIds = table.getAllLeafColumns().map((col) => col.id);

  const sanitizedSettings: Partial<TableState> = {};

  // columnFilters
  if (localDefaults.columnFilters) {
    sanitizedSettings.columnFilters = localDefaults.columnFilters.filter((filter) => columnIds.includes(filter.id));
  }

  // columnOrder
  if (localDefaults.columnOrder) {
    const sanitizedLocalColumnOrder = localDefaults.columnOrder.filter((columnId) => columnIds.includes(columnId));

    columnIds.forEach((columnId) => {
      if (!sanitizedLocalColumnOrder.includes(columnId)) {
        sanitizedLocalColumnOrder.push(columnId);
      }
    });
    sanitizedSettings.columnOrder = sanitizedLocalColumnOrder;
  }

  // columnSizing
  if (localDefaults.columnSizing) {
    sanitizedSettings.columnSizing = Object.fromEntries(
      Object.entries(localDefaults.columnSizing).filter(([id, _num]) => columnIds.includes(id))
    );
  }

  // expanded
  if (localDefaults.expanded) {
    sanitizedSettings.expanded = localDefaults.expanded;
  }

  // grouping
  if (localDefaults.grouping) {
    sanitizedSettings.grouping = localDefaults.grouping.filter((columnId) => columnIds.includes(columnId));
  }

  // rowSelection
  if (localDefaults.rowSelection) {
    sanitizedSettings.rowSelection = localDefaults.rowSelection;
  }

  if (localDefaults.sorting) {
    sanitizedSettings.sorting = localDefaults.sorting.filter((sort) => columnIds.includes(sort.id));
  }

  // columnPinning
  if (localDefaults.columnPinning) {
    sanitizedSettings.columnPinning = {};

    // columnPinning.left
    if (localDefaults.columnPinning.left) {
      sanitizedSettings.columnPinning.left = localDefaults.columnPinning.left.filter((columnId) =>
        columnIds.includes(columnId)
      );
    }

    // columnPinning.right
    if (localDefaults.columnPinning.right) {
      sanitizedSettings.columnPinning.right = localDefaults.columnPinning.right.filter((columnId) =>
        columnIds.includes(columnId)
      );
    }
  }

  // pagination
  if (localDefaults.pagination) {
    sanitizedSettings.pagination = localDefaults.pagination;
  }

  // rowPinning
  if (localDefaults.rowPinning) {
    sanitizedSettings.rowPinning = localDefaults.rowPinning;
  }

  // columnVisibility
  if (localDefaults.columnVisibility) {
    const sanitizedLocalColumnVisibility = Object.fromEntries(
      Object.entries(localDefaults.columnVisibility).filter(([id, _num]) => columnIds.includes(id))
    );

    columnIds.forEach((columnId) => {
      if (sanitizedLocalColumnVisibility[columnId] === undefined) {
        sanitizedLocalColumnVisibility[columnId] = true;
      }
    });
    sanitizedSettings.columnVisibility = sanitizedLocalColumnVisibility;
  }

  return sanitizedSettings;
};

type InteractiveTableSettingsReducerState = {
  tableState: TableState;
  localSettingsBehind: boolean;
};

type InteractiveTableSettingsReducerAction =
  | {
      type: 'SYNC_LOCAL_SETTINGS';
    }
  | {
      type: 'UPDATE' | 'LOCAL_SETTINGS_UPDATED';
      newTableState: TableState;
    };

const tableSettingsReducer = (
  state: InteractiveTableSettingsReducerState,
  action: InteractiveTableSettingsReducerAction
): InteractiveTableSettingsReducerState => {
  switch (action.type) {
    case 'UPDATE':
      return {
        tableState: action.newTableState,
        localSettingsBehind: true,
      };
    case 'SYNC_LOCAL_SETTINGS':
      return {
        tableState: state.tableState,
        localSettingsBehind: false,
      };
    case 'LOCAL_SETTINGS_UPDATED':
      return {
        tableState: action.newTableState,
        localSettingsBehind: false,
      };
  }
};

const useAllianceInteractiveTableSettings = <TData extends RowData>(
  tableId: string,
  table: Table<TData>,
  initialSettings: Partial<TableState> = {},
  useLocalStorage: boolean = false,
  onQueryKeyUpdate?: (queryKey: unknown[]) => void,
  onQueryParamUpdate?: (queryParams: string) => void
): {
  tableState: TableState;
  updateTableState: (newTableState: TableState) => void;
  resetTableState: () => void;
} => {
  const [localSettings, updateLocalSettings] = useSmartStorage<TableState>(`interactiveTableSettings.${tableId}`);

  let defaultState = getDefaultSettingsForTable(table, initialSettings);
  if (useLocalStorage) {
    const sanitizedLocalSettings = sanitizeLocalSettings(table, localSettings);
    defaultState = overrideSettings(defaultState, sanitizedLocalSettings);
  }

  const [{ tableState, localSettingsBehind }, dispatch] = useReducer(tableSettingsReducer, {
    tableState: defaultState,
    localSettingsBehind: true,
  });

  useEffect(() => {
    if (onQueryKeyUpdate) {
      onQueryKeyUpdate([tableState.pagination, tableState.sorting, tableState.columnFilters]);
    }

    //TODO: when using backend logic mode, require sortKey if enableSorting is set to true
    //TODO: when using backend logic mode, require filterKey if enableFiltering is set to true
    //TODO: default sort state should be an empty array because no column with id "" exists
    if (onQueryParamUpdate) {
      console.log(tableState.columnFilters);

      const params = {
        page: tableState.pagination.pageIndex + 1 || 1,
        limit: tableState.pagination.pageSize || null,
        sortBy: table.getColumn(tableState.sorting[0].id)?.columnDef.meta?.sortKey || null,
        ...(tableState.columnFilters.length > 0
          ? {
              filter: Object.fromEntries(
                tableState.columnFilters
                  .filter((filter) => table.getColumn(filter.id)?.columnDef.meta?.filterKey !== undefined)
                  .map((filter) => [
                    table.getColumn(filter.id)?.columnDef.meta?.filterKey,
                    (filter.value as string[]).join('|'),
                  ])
              ),
            }
          : {}),
      };
      onQueryParamUpdate('?' + stringify(params, { skipNulls: true, allowDots: true }));
    }
  }, [onQueryKeyUpdate, tableState.pagination, tableState.sorting, tableState.columnFilters]);

  table.setOptions((prev) => {
    return {
      ...prev,
      state: tableState,
      onStateChange: (newState) => {
        dispatch({ type: 'UPDATE', newTableState: typeof newState === 'function' ? newState(tableState) : newState });
      },
    };
  });

  useEffect(() => {
    if (localSettingsBehind) {
      dispatch({ type: 'SYNC_LOCAL_SETTINGS' });

      if (useLocalStorage) {
        updateLocalSettings('', tableState);
      }
    }
  }, [localSettingsBehind, tableState, dispatch, updateLocalSettings, useLocalStorage]);

  useEffect(() => {
    if (useLocalStorage && !localSettingsBehind && JSON.stringify(localSettings) !== JSON.stringify(tableState)) {
      dispatch({ type: 'LOCAL_SETTINGS_UPDATED', newTableState: localSettings });
    }
  }, [useLocalStorage, localSettingsBehind, localSettings, tableState, dispatch]);

  const resetTableState = () =>
    dispatch({ type: 'UPDATE', newTableState: getDefaultSettingsForTable(table, initialSettings) });
  const updateTableState = (newTableState: TableState) => dispatch({ type: 'UPDATE', newTableState });

  return {
    tableState,
    resetTableState,
    updateTableState,
  };
};

export default useAllianceInteractiveTableSettings;
