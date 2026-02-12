import type { Cell, CellContext, Renderable } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import { type CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { type ChildRowEnabledRow } from '../types';

type TableCellProps = {
  cell: Cell<any, unknown>;
  showColumnLines: boolean;
  draggable?: boolean;
};

const TableCell = ({ cell, showColumnLines, draggable = false }: TableCellProps) => {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: cell.column.id,
  });

  const table = cell.getContext().table;
  const columnOrder = table.getState().columnOrder;
  const prevColId = columnOrder[cell.column.getIndex() - 1];
  const nextColId = columnOrder[cell.column.getIndex() + 1];

  let showLeftBorder = false;
  let showRightBorder = false;

  if (showColumnLines) {
    showLeftBorder = prevColId !== undefined;
  } else if (cell.column.parent) {
    if (!prevColId) showLeftBorder = true;
    else {
      const prevCol = prevColId ? table.getColumn(prevColId) : null;
      if (!prevCol) showLeftBorder = false;
      else if (!prevCol.parent) showLeftBorder = false;
      else if (prevCol.parent.id !== cell.column.parent.id) showLeftBorder = true;
    }

    if (!nextColId) showRightBorder = true;
    else {
      const nextCol = nextColId ? table.getColumn(nextColId) : null;
      if (!nextCol) showRightBorder = false;
      else if (!nextCol.parent) showRightBorder = false;
      else if (nextCol.parent.id !== cell.column.parent.id) showRightBorder = true;
    }
  }

  const style: CSSProperties = {
    textAlign: 'left',
    ...(showLeftBorder ? { borderLeft: '1px solid rgb(221, 221, 221)' } : ''),
    ...(showRightBorder ? { borderRight: '1px solid rgb(221, 221, 221)' } : ''),
    ...(cell.column.columnDef.meta?.align && cell.column.columnDef.meta.align !== 'center'
      ? {
          textAlign: cell.column.columnDef.meta.align,
        }
      : ''),
    ...((cell.row as ChildRowEnabledRow<any>).childDepth === 0
      ? {
          backgroundColor: 'rgb(249, 249, 249) !important',
        }
      : ''),
    ...((cell.row as ChildRowEnabledRow<any>).childDepth === 1
      ? {
          backgroundColor: 'white !important',
        }
      : ''),
    ...(cell.column.columnDef.meta?.nowrap ? { whiteSpace: 'nowrap' } : ''),
    ...(draggable
      ? {
          opacity: isDragging ? 0.8 : 1,
          position: 'relative',
          transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
          transition,
          // transition: 'width transform 0.2s ease-in-out',
          zIndex: isDragging ? 1 : 0,
        }
      : ''),
  };

  return (
    <td style={style} ref={setNodeRef} rowSpan={(cell.row as ChildRowEnabledRow<any>).totalChildRows || 1}>
      {flexRender(
        (cell.column.columnDef.meta?.childRow?.cell
          ? cell.column.columnDef.meta.childRow.cell
          : cell.column.columnDef.cell) as Renderable<CellContext<any, unknown>>,
        cell.getContext()
      )}
    </td>
  );
};

export default TableCell;
