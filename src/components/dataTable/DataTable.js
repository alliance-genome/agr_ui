import React, { useRef } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Form, Input, Label } from 'reactstrap';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';
import DownloadButton from './downloadButton';
import TableSummary from './tableSummary';
import { renderPaginationShowsTotal } from './utils';
import LoadingOverlay from './loadingOverlay';
import PerPageSizeSelector from './pagePerSizeSelector';
import NoData from '../noData';
import ColumnHeader from './columnHeader';
import DropdownTextFilter from './dropdownTextFilter';
import DropdownCheckboxFilter from './dropdownCheckboxFilter';
import HorizontalScroll from '../horizontalScroll';
import { buildTableQueryString } from '../../lib/utils';

const DataTable = ({
  className,
  columns,
  data,
  downloadUrl,
  keyField,
  loading,
  noDataMessage,
  pagination = true,
  sortOptions,
  summaryProps,
  totalRows,
  tableState,
  setTableState,
  ...bootstrapTableProps
}) => {
  const containerRef = useRef(null);
  const translateFilterNames = (filters) => {
    const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
      [newProp]: old,
      ...others
    });
    columns.forEach(column => {
      if (column.filterName && column.dataField in filters) {
        filters = renameProp(column.dataField, column.filterName, filters);
      }
    });
    return filters;
  };

  const scrollIntoView = () => {
    containerRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
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

  if (!loading && Object.keys(filters).length === 0 && totalRows === 0) {
    return <NoData>{noDataMessage}</NoData>;
  }

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
    onSizePerPageChange: scrollIntoView
  });

  columns.forEach(column => {
    const columnFilter = filters &&
      filters[column.dataField] &&
      filters[column.dataField].filterVal;
    if (!column.headerFormatter) {
      column.headerFormatter = (column, _, {filterElement}) => (
        <ColumnHeader
          column={column}
          filter={columnFilter}
          filterElement={filterElement}
        />
      );
    }

    if (column.filterable) {
      column.filter = customFilter();
      if (Array.isArray(column.filterable)) {
        column.filterRenderer = (onFilter, column) => (
          <DropdownCheckboxFilter
            defaultFilter={columnFilter}
            labelClassName={column.filterLabelClassName}
            onFilter={onFilter}
            options={column.filterable}
          />
        );
      } else {
        column.filterRenderer = (onFilter, column) => (
          <DropdownTextFilter
            column={column}
            defaultFilter={columnFilter}
            onFilter={onFilter}
          />
        );
      }
    }
  });

  return (
    <div className={className} ref={containerRef} style={{position: 'relative'}}>
      <LoadingOverlay loading={loading} />
      <PaginationProvider pagination={paginationObj}>
        {
          ({paginationProps, paginationTableProps}) => (
            <div>
              {
                summaryProps ?
                  <TableSummary style={{display: 'inline-block'}} {...summaryProps} /> :
                  null
              }
              {sortOptions && sortOptions.length > 0 &&
              <Form className='d-flex justify-content-end' inline>
                <Label className="mr-1">Sort by</Label>
                <Input onChange={handleSortChange} type='select' value={sort || ''}>
                  <option value=''>Default</option>
                  {sortOptions.map(sort => (
                    <option key={sort.value} value={sort.value}>{sort.label}</option>
                  ))}
                </Input>
              </Form>
              }
              <HorizontalScroll>
                <BootstrapTable
                  {...bootstrapTableProps}
                  bootstrap4
                  bordered={false}
                  columns={columns}
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
              {pagination &&
                <div className='my-2'>
                  <span className='text-muted'>
                    <PaginationTotalStandalone {...paginationProps} />
                    <SizePerPageDropdownStandalone {...paginationProps} />
                      per page
                  </span>
                  <PaginationListStandalone {...paginationProps} />
                </div>
              }
            </div>
          )
        }
      </PaginationProvider>
      {downloadUrl &&
      <DownloadButton
        downloadUrl={`${downloadUrl}${downloadUrl.indexOf('?') < 0 ? '?' : '&'}${buildTableQueryString(tableState)}`}
      />
      }
    </div>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  downloadUrl: PropTypes.string,
  keyField: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  noDataMessage: PropTypes.string,
  pagination: PropTypes.bool,
  setTableState: PropTypes.func.isRequired,
  sortOptions: PropTypes.array,
  summaryProps: PropTypes.object,
  tableState: PropTypes.object.isRequired,
  totalRows: PropTypes.number,
};

export default DataTable;
