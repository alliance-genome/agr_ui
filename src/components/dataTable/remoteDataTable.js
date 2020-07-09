/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
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
import isEqual from 'lodash.isequal';

import DownloadButton from './downloadButton';
import TableSummary from './tableSummary';
import { renderPaginationShowsTotal } from './utils';
// import * as analytics from '../../lib/analytics';
import { DEFAULT_TABLE_STATE } from '../../constants';
import LoadingOverlay from './loadingOverlay';
import PerPageSizeSelector from './pagePerSizeSelector';
import NoData from '../noData';
import ColumnHeader from './columnHeader';
import DropdownTextFilter from './dropdownTextFilter';
import DropdownCheckboxFilter from './dropdownCheckboxFilter';
import HorizontalScroll from '../horizontalScroll';
import { buildTableQueryString } from '../../lib/utils';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_TABLE_STATE;
    this.containerRef = React.createRef();

    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.scrollIntoView = this.scrollIntoView.bind(this);
  }

  componentDidMount() {
    this.props.onUpdate(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state, prevState)) {
      this.props.onUpdate(this.translateFilterNames(this.state));
    }
  }

  reset() {
    this.setState(DEFAULT_TABLE_STATE);
  }

  translateFilterNames(tableOpts) {
    let filters = {...tableOpts.filters};
    const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
      [newProp]: old,
      ...others
    });
    this.props.columns.forEach(column => {
      if (column.filterName && column.dataField in filters) {
        filters = renameProp(column.dataField, column.filterName, filters);
      }
    });
    return {
      ...tableOpts,
      filters,
    };
  }

  scrollIntoView() {
    this.containerRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  handleTableChange(type, newState) {
    // TODO: GA calls
    this.setState(newState);
  }

  handleSortChange(event) {
    this.setState({sort: event.target.value});
  }

  render() {
    const { columns, data = [], downloadUrl, keyField, loading, noDataMessage, sortOptions, summaryProps, totalRows, className, ...bootstrapTableProps } = this.props;
    const { filters, page, sizePerPage, sort } = this.state;

    if (!loading && filters == null && totalRows === 0) {
      return <NoData>{noDataMessage}</NoData>;
    }

    const pagination = paginationFactory({
      custom: true,
      page,
      paginationTotalRenderer: renderPaginationShowsTotal,
      sizePerPage,
      showTotal: true,
      totalSize: totalRows,
      sizePerPageList: [10, 25, 100],
      sizePerPageRenderer: PerPageSizeSelector,
      onPageChange: this.scrollIntoView,
      onSizePerPageChange: this.scrollIntoView
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
      <div className={className} ref={this.containerRef} style={{position: 'relative'}}>
        <LoadingOverlay loading={loading} />
        <PaginationProvider pagination={pagination}>
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
                    <Input onChange={this.handleSortChange} type='select' value={sort || ''}>
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
                    onTableChange={this.handleTableChange}
                    remote
                    {...paginationTableProps}
                  />
                </HorizontalScroll>
                <div className='my-2'>
                  <span className='text-muted'>
                    <PaginationTotalStandalone {...paginationProps} />
                    <SizePerPageDropdownStandalone {...paginationProps} />
                    per page
                  </span>
                  <PaginationListStandalone {...paginationProps} />
                </div>
              </div>
            )
          }
        </PaginationProvider>
        {downloadUrl &&
          <DownloadButton
            downloadUrl={`${downloadUrl}${downloadUrl.indexOf('?') < 0 ? '?' : '&'}${buildTableQueryString(this.translateFilterNames({sort, filters}))}`}
          />
        }
      </div>
    );
  }
}

RemoteDataTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object),
  downloadUrl: PropTypes.string,
  keyField: PropTypes.string,
  loading: PropTypes.bool,
  noDataMessage: PropTypes.string,
  onUpdate: PropTypes.func,
  sortOptions: PropTypes.array,
  summaryProps: PropTypes.object,
  totalRows: PropTypes.number,
};

export default RemoteDataTable;
