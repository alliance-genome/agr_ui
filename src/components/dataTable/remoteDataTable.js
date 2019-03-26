/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

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
import Utils from './utils';
// import * as analytics from '../../lib/analytics';
// import PaginationPanel from './paginationPanel';
import { DEFAULT_TABLE_STATE } from '../../constants';
import LoadingOverlay from './loadingOverlay';
import PerPageSizeSelector from './pagePerSizeSelector';
import NoData from '../noData';
import ColumnHeader from './columnHeader';
import DropdownTextFilter from './dropdownTextFilter';
import DropdownCheckboxFilter from './dropdownCheckboxFilter';
import HorizontalScroll from '../horizontalScroll';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_TABLE_STATE;
    this.columnRefs = new Map();
    this.containerRef = React.createRef();

    this.handleTableChange = this.handleTableChange.bind(this);
    this.scrollIntoView = this.scrollIntoView.bind(this);
  }

  componentDidMount() {
    this.props.onUpdate(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state, prevState)) {
      this.props.onUpdate(this.state);
    }
  }

  setColumnRef(key, ref) {
    this.columnRefs.set(key, ref);
  }

  reset() {
    this.setState(DEFAULT_TABLE_STATE);
    this.columnRefs.forEach(ref => ref && ref.cleanFiltered());
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

  render() {
    const { columns, data, downloadUrl, keyField, loading, totalRows } = this.props;
    const { filters, page, sizePerPage } = this.state;

    if (!loading && filters == null && totalRows === 0) {
      return <NoData />;
    }

    // const options = {
    //   onFilterChange: this.handleFilterChange,
    //   onPageChange: this.handlePageChange,
    //   onSizePerPageList: this.handleSizeChange,
    //   sortName: sort.name,
    //   sortOrder: sort.order,
    //   onSortChange: this.handleSortChange,
    //   paginationPanel: PaginationPanel,
    //   paginationShowsTotal: Utils.renderPaginationShowsTotal,
    //   page: page,
    //   sizePerPage: limit,
    //   sizePerPageDropDown: Utils.renderSizePerPageDropDown,
    //   sizePerPageList: [10, 25, 100],
    // };

    const pagination = paginationFactory({
      custom: true,
      page,
      paginationTotalRenderer: Utils.renderPaginationShowsTotal,
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
      column.headerFormatter = (column, _, {filterElement}) => (
        <ColumnHeader
          column={column}
          filter={columnFilter}
          filterElement={filterElement}
        />
      );
      if (column.filterable) {
        column.filter = customFilter();
        if (Array.isArray(column.filterable)) {
          column.filterRenderer = (onFilter, column) => (
            <DropdownCheckboxFilter
              column={column}
              defaultFilter={columnFilter}
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
      <div ref={this.containerRef} style={{position: 'relative'}}>
        <LoadingOverlay loading={loading} />
        <PaginationProvider pagination={pagination}>
          {
            ({paginationProps, paginationTableProps}) => (
              <div>
                <HorizontalScroll>
                  <BootstrapTable
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
                <span className='text-muted'>
                  <PaginationTotalStandalone {...paginationProps} />
                  <SizePerPageDropdownStandalone {...paginationProps} />
                  per page
                </span>
                <PaginationListStandalone {...paginationProps} />
              </div>
            )
          }
        </PaginationProvider>
        <DownloadButton downloadUrl={downloadUrl} />
      </div>
    );
  }
}

RemoteDataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object),
  downloadUrl: PropTypes.string,
  keyField: PropTypes.string,
  loading: PropTypes.bool,
  onUpdate: PropTypes.func,
  totalRows: PropTypes.number,
};

export default RemoteDataTable;
