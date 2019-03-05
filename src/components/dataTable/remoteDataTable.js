/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  // PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';

import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DownloadButton from './downloadButton';
// import Utils from './utils';
// import * as analytics from '../../lib/analytics';
// import PaginationPanel from './paginationPanel';
import { DEFAULT_TABLE_STATE } from '../../constants';
import LoadingOverlay from './loadingOverlay';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_TABLE_STATE;
    this.columnRefs = new Map();

    this.handleTableChange = this.handleTableChange.bind(this);
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

  handleTableChange(type, newState) {
    // TODO: GA calls
    this.setState(newState);
  }

  render() {
    const { columns, data, downloadUrl, keyField, loading, totalRows } = this.props;
    const { page, sizePerPage } = this.state;

    // if (!loading && filters !== null && totalRows === 0) {
    //   return <NoData />;
    // }

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

    // const pagination = paginationFactory({
    //   custom: true,
    //   page,
    //   sizePerPage,
    //   totalSize: totalRows,
    //   // sizePerPageList: [10, 25, 100],
    //   // showTotal: true
    // });

    return (
      <div style={{position: 'relative'}}>
        <LoadingOverlay loading={loading} />

        {/* <PaginationProvider pagination={paginationFactory(pagination)}>
          {
            ({paginationProps, paginationTableProps}) => (
              <div>
                <SizePerPageDropdownStandalone {...paginationProps} />
                <PaginationTotalStandalone {...paginationProps} />
                <BootstrapTable
                  bootstrap4
                  bordered={false}
                  columns={columns}
                  condensed
                  data={data}
                  keyField={keyField}
                  loading={loading}
                  onTableChange={this.handleTableChange}
                  // pagination={pagination}
                  // remote
                  {...paginationTableProps}
                />
                <PaginationListStandalone {...paginationProps} />
              </div>
            )
          }
        </PaginationProvider> */}

        <PaginationProvider
          pagination={
            paginationFactory({
              custom: true,
              page,
              sizePerPage,
              totalSize: totalRows,
              sizePerPageList: [10, 25, 100]
            })
          }
        >
          {
            ({
              paginationProps,
              paginationTableProps
            }) => (
              <div>
                <div>
                  <p>Current Page: { paginationProps.page }</p>
                  <p>Current SizePerPage: { paginationProps.sizePerPage }</p>
                </div>
                <SizePerPageDropdownStandalone {...paginationProps} btnContextual='btn-outline-secondary' />
                <div>
                  <PaginationListStandalone
                    {...paginationProps}
                  />
                </div>
                <BootstrapTable
                  bootstrap4
                  bordered={false}
                  columns={columns}
                  condensed
                  data={data}
                  keyField={keyField}
                  onTableChange={this.handleTableChange}
                  remote
                  {...paginationTableProps}
                />
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
