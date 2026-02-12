import { flexRender, type Header } from '@tanstack/react-table';
import React, { type CSSProperties, useId } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import UpArrowIcon from '../icons/UpArrowIcon';
import DownArrowIcon from '../icons/DownArrowIcon';
import UpDownArrowIcon from '../icons/UpDownArrowIcon';
import HelpPopup from '../../../components/helpPopup';
import ColumnFilter from '@agr-tanstack-react-table/components/ColumnFilter.tsx';

type TableHeaderProps = {
  header: Header<any, unknown>;
  useHeaderSorting?: boolean;
  draggable?: boolean;
  supplementalData?: { distinctFieldValues: { [key: string]: string[] } };
};

const TableHeader: React.FC<TableHeaderProps> = ({
  header,
  draggable = false,
  useHeaderSorting = false,
  supplementalData,
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: header.column.id,
  });

  const id = useId();

  //TODO: columnOrder includes hidden columns leading to bugs with border rendering
  const table = header.getContext().table;
  const columnOrder = table.getState().columnOrder;
  const prevColId = columnOrder[header.index - 1];
  const nextColId = columnOrder[header.index + 1];

  let showLeftBorder = false;
  let showRightBorder = false;

  if (header.column.parent) {
    if (!prevColId) showLeftBorder = true;
    else {
      const prevCol = prevColId ? table.getColumn(prevColId) : null;
      if (!prevCol) showLeftBorder = false;
      else if (!prevCol.parent) showLeftBorder = false;
      else if (prevCol.parent.id !== header.column.parent.id) showLeftBorder = true;
    }

    if (!nextColId) showRightBorder = true;
    else {
      const nextCol = nextColId ? table.getColumn(nextColId) : null;
      if (!nextCol) showRightBorder = false;
      else if (!nextCol.parent) showRightBorder = false;
      else if (nextCol.parent.id !== header.column.parent.id) showRightBorder = true;
    }
  }

  const isBottomMostHeader = header.subHeaders.length === 0;
  const alignment = header.column.columnDef.meta?.align || 'center';

  const style: CSSProperties = {
    // whiteSpace: !isBottomMostHeader ? 'normal' : 'nowrap',
    textAlign: isBottomMostHeader ? 'left' : 'center',
    ...(showLeftBorder ? { borderLeft: '1px solid rgb(221, 221, 221)' } : ''),
    ...(showRightBorder ? { borderRight: '1px solid rgb(221, 221, 221)' } : ''),
    ...(alignment !== 'center'
      ? {
          textAlign: alignment,
        }
      : ''),
    ...(header.column.columnDef.meta?.width
      ? {
          minWidth: header.column.columnDef.meta?.width,
        }
      : {}),
    ...(draggable
      ? {
          position: 'relative',
          transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
          transition,
          cursor: 'default',
          ...(isBottomMostHeader
            ? {
                cursor: isDragging ? 'grabbing' : 'pointer',
                opacity: isDragging ? 0.8 : 1,
              }
            : ''),
          zIndex: isDragging ? 1 : 0,
        }
      : ''),
  };

  const indexWithinGroup = header.headerGroup.headers.map((h) => h.id).indexOf(header.id);

  let draggableProps = {};

  if (draggable) {
    draggableProps = {
      ref: setNodeRef,
      ...attributes,
      ...listeners,
    };
  }

  const isSortable = useHeaderSorting && header.column.getCanSort();
  const isFilterable = header.column.getCanFilter();

  return (
    <th
      colSpan={header.colSpan}
      onClick={() => {
        isSortable && isBottomMostHeader && header.column.toggleSorting();
      }}
      className={classNames({
        'border-column': indexWithinGroup === 0 || indexWithinGroup === header.headerGroup.headers.length - 1,
        'right-aligned': alignment === 'right',
      })}
      style={style}
      {...draggableProps}
    >
      {isSortable && isBottomMostHeader && alignment === 'right' && (
        <>
          {header.column.getIsSorted() === 'desc' && <UpArrowIcon />}
          {header.column.getIsSorted() === 'asc' && <DownArrowIcon />}
          {!header.column.getIsSorted() && <UpDownArrowIcon />}
        </>
      )}
      {flexRender(header.column.columnDef.header, header.getContext())}
      {isFilterable && <ColumnFilter column={header.column} supplementalData={supplementalData} />}
      {header.column.columnDef.meta?.headerTooltip && (
        <HelpPopup id={`${id}-${header.column.id}-tooltip`}>{header.column.columnDef.meta.headerTooltip}</HelpPopup>
      )}
      {isSortable && isBottomMostHeader && alignment !== 'right' && (
        <>
          {header.column.getIsSorted() === 'desc' && <UpArrowIcon />}
          {header.column.getIsSorted() === 'asc' && <DownArrowIcon />}
          {!header.column.getIsSorted() && <UpDownArrowIcon />}
        </>
      )}
    </th>
  );
};

export default TableHeader;
