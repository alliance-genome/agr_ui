import type { RowData, Table } from '@tanstack/react-table';
import { useId } from 'react';

type PageSelectorProps<TData extends RowData> = {
  table: Table<TData>;
};

const MAX_PAGE_INDEX_BUTTONS = 5;

const PageSelector = <TData extends RowData>({ table }: PageSelectorProps<TData>) => {
  const id = useId();

  const currentPageIndex = table.getState().pagination.pageIndex;
  const totalIndexes = Math.min(MAX_PAGE_INDEX_BUTTONS, table.getPageCount());
  const totalIndexesEachSideOfCurrent = (totalIndexes - 1) / 2;
  let minIndex = currentPageIndex - Math.ceil(totalIndexesEachSideOfCurrent);
  let maxIndex = currentPageIndex + Math.floor(totalIndexesEachSideOfCurrent);

  if (minIndex < 0) {
    maxIndex -= minIndex;
    minIndex = 0;
  }

  const pageIndexRadioIndexes = [];
  for (let i = minIndex; i <= maxIndex; i++) {
    pageIndexRadioIndexes.push(i);
  }

  const showFirstPage = pageIndexRadioIndexes[0] > 0;
  const showLastPage = pageIndexRadioIndexes[pageIndexRadioIndexes.length - 1] < table.getPageCount() - 1;

  return (
    <ol className="pagination-controls">
      {showFirstPage && (
        <li>
          <button onClick={() => table.firstPage()}>{'<<'}</button>
        </li>
      )}
      {table.getCanPreviousPage() && (
        <li>
          <button onClick={() => table.previousPage()}>{'<'}</button>
        </li>
      )}
      {pageIndexRadioIndexes.map((pageIndex) => (
        <li key={pageIndex} className="radio-button">
          <label>
            <input
              type="radio"
              name={`${id}-pageIndex-radio`}
              checked={table.getState().pagination.pageIndex === pageIndex}
              onChange={(_) => table.setPageIndex(pageIndex)}
            />

            <span>{pageIndex + 1}</span>
          </label>
        </li>
      ))}
      {table.getCanNextPage() && (
        <li>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {'>'}
          </button>
        </li>
      )}
      {showLastPage && (
        <li>
          <button onClick={() => table.lastPage()}>{'>>'}</button>
        </li>
      )}
    </ol>
  );
};

export default PageSelector;
