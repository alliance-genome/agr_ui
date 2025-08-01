import React, { useRef } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Form, Input, Label } from 'reactstrap';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
} from 'react-bootstrap-table2-paginator';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';
import DownloadButton from './downloadButton.jsx';
import TableSummary from './tableSummary.jsx';
import { renderPaginationShowsTotal, getDistinctFieldValue } from './utils.jsx';
import LoadingOverlay from './loadingOverlay.jsx';
import PerPageSizeSelector from './pagePerSizeSelector.jsx';
import NoData from '../noData.jsx';
import ColumnHeader from './columnHeader.jsx';
import DropdownTextFilter from './dropdownTextFilter.jsx';
import DropdownCheckboxFilter from './DropdownCheckboxFilter.jsx';
import HorizontalScroll from '../horizontalScroll.jsx';
import { buildTableQueryString } from '../../lib/utils';
import LoadingSpinner from '../loadingSpinner.jsx';
import DropdownNoDataFilter from './DropdownNoDataFilter.jsx';
import { DOWNLOAD_BUTTON_THRESHOLD } from '../../constants';
import { Link } from 'react-router-dom';

const DataTable = ({
  className,
  columns,
  data,
  supplementalData,
  downloadUrl,
  downloadMethod,
  downloadBody,
  error,
  isError,
  isFetching,
  isIdle,
  isLoading,
  keyField,
  noDataMessage,
  pagination = true,
  setTableState,
  sortOptions,
  summaryProps,
  tableState,
  totalRows,
  ...bootstrapTableProps
}) => {
  const containerRef = useRef(null);
  const translateFilterNames = (filters) => {
    const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
      [newProp]: old,
      ...others,
    });
    columns.forEach((column) => {
      if (column.filterName && column.dataField in filters) {
        filters = renameProp(column.dataField, column.filterName, filters);
      }
    });
    return filters;
  };

  const scrollIntoView = () => {
    containerRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleTableChange = (type, newState) => {
    setTableState({
      ...tableState,
      page: newState.page,
      sizePerPage: newState.sizePerPage,
      filters: translateFilterNames(newState.filters),
    });
  };

  const handleSortChange = (event) => {
    setTableState({
      ...tableState,
      sort: event.target.value,
    });
  };

  const { filters, page, sizePerPage, sort } = tableState;

  if (isError) {
    throw error;
  }

  // no data has loaded, query has not been initiated. don't render anything
  if (isIdle) {
    return null;
  }

  // the initial fetch is happening, show spinner, don't render the table yet
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // the initial fetch has happened and there is no data
  if (!isFetching && Object.keys(filters).length === 0 && totalRows === 0) {
    return <NoData>{noDataMessage}</NoData>;
  }

  if (!data) {
    return <NoData>{noDataMessage}</NoData>;
  }

  // if we reached this far, we want to show the table

  const paginationObj = paginationFactory({
    custom: true,
    page,
    paginationTotalRenderer: renderPaginationShowsTotal,
    sizePerPage,
    showTotal: true,
    totalSize: totalRows,
    sizePerPageList: [10, 25, 100],
    sizePerPageRenderer: PerPageSizeSelector,
    onPageChange: scrollIntoView,
    onSizePerPageChange: scrollIntoView,
  });

  const disabled = paginationObj.options?.totalSize > DOWNLOAD_BUTTON_THRESHOLD;

  const filteredColumns = columns.filter((column) => !column.hide);

  filteredColumns.forEach((column) => {
    const filterField = column.filterName || column.dataField;
    const columnFilter = filters && filters[filterField] && filters[filterField].filterVal;
    if (!column.headerFormatter) {
      column.headerFormatter = (column, _, { filterElement }) => (
        <ColumnHeader column={column} filter={columnFilter} filterElement={filterElement} />
      );
    }

    if (column.filterable) {
      column.filter = customFilter();

      const distinctFieldValues = Array.isArray(column.filterable)
        ? column.filterable
        : getDistinctFieldValue(supplementalData, `filter.${filterField}`);

      if (distinctFieldValues && distinctFieldValues.length > 0) {
        column.filterRenderer = (onFilter, column) => (
          <DropdownCheckboxFilter
            formatter={column.filterFormatter}
            onChange={onFilter}
            options={distinctFieldValues}
            value={columnFilter}
          />
        );
        //if filter is a checkbox dropdown, but there is are no distinctFieldValues then show DropdownNoDataFilter instead
      } else if (column.filterType === 'checkbox') {
        column.filterRenderer = () => <DropdownNoDataFilter />;
      } else {
        column.filterRenderer = (onFilter, column) => (
          <DropdownTextFilter column={column} defaultFilter={columnFilter} onFilter={onFilter} />
        );
      }
    }
  });

  return (
    <div className={className} ref={containerRef} style={{ position: 'relative' }}>
      <LoadingOverlay loading={isFetching} />
      <PaginationProvider pagination={paginationObj}>
        {({ paginationProps, paginationTableProps }) => (
          <div>
            {summaryProps ? <TableSummary style={{ display: 'inline-block' }} {...summaryProps} /> : null}
            {sortOptions && sortOptions.length > 0 && (
              <Form className="d-flex justify-content-end" inline>
                <Label className="mr-1">Sort by</Label>
                <Input onChange={handleSortChange} type="select" value={sort || ''}>
                  <option value="">Default</option>
                  {sortOptions.map((sort) => (
                    <option key={sort.value} value={sort.value}>
                      {sort.label}
                    </option>
                  ))}
                </Input>
              </Form>
            )}
            <HorizontalScroll>
              <BootstrapTable
                {...bootstrapTableProps}
                bootstrap4
                bordered={false}
                columns={filteredColumns}
                condensed
                data={data}
                filter={filterFactory()}
                keyField={keyField}
                noDataIndication={() => <span>No records match query. Try removing filters.</span>}
                onTableChange={handleTableChange}
                remote
                {...paginationTableProps}
              />
            </HorizontalScroll>
            {pagination && (
              <div className="my-2">
                <span className="text-muted">
                  <PaginationTotalStandalone {...paginationProps} />
                  <SizePerPageDropdownStandalone {...paginationProps} />
                  per page
                </span>
                <PaginationListStandalone {...paginationProps} />
              </div>
            )}
          </div>
        )}
      </PaginationProvider>
      {downloadUrl && (
        <DownloadButton
          downloadUrl={`${downloadUrl}${downloadUrl.indexOf('?') < 0 ? '?' : '&'}${buildTableQueryString(tableState)}`}
          disabled={disabled}
          method={downloadMethod}
          body={downloadBody}
        />
      )}
      {disabled && (
        <div style={{ color: 'red' }}>
          The table above cannot be downloaded because there are too many rows in the unfiltered table. Please apply
          filter(s) to limit the number of rows to less than {DOWNLOAD_BUTTON_THRESHOLD} to enable the Download button
          or visit our
          <Link to="/downloads"> Downloads page </Link>
          to download the entire data set.
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  supplementalData: PropTypes.object,
  downloadUrl: PropTypes.string,
  error: PropTypes.object,
  isError: PropTypes.bool,
  isFetching: PropTypes.bool,
  isIdle: PropTypes.bool,
  isLoading: PropTypes.bool,
  keyField: PropTypes.string.isRequired,
  noDataMessage: PropTypes.string,
  pagination: PropTypes.bool,
  setTableState: PropTypes.func.isRequired,
  sortOptions: PropTypes.array,
  summaryProps: PropTypes.object,
  tableState: PropTypes.object.isRequired,
  totalRows: PropTypes.number,
};

export default DataTable;
