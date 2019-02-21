import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

import Utils from './utils';
import * as analytics from '../../lib/analytics';
import DownloadButton from './downloadButton';
import PaginationPanel from './paginationPanel';

const textSorter = (textRender, field) => {
  return (a, b, order) => {
    if (order === 'desc') {
      return textRender(a[field]).localeCompare(textRender(b[field]));
    } else {
      return textRender(b[field]).localeCompare(textRender(a[field]));
    }
  };
};

const getSortFunction = (column) => {
  const textFunction = column.filterText || column.asText;
  if (!textFunction) {
    return null;
  }
  return textSorter(textFunction, column.field);
};

class LocalDataTable extends Component {
  constructor(props) {
    super(props);
  }

  renderDownloadButton(onClick) {
    return (
      <div className='btn-group' role='group'>
        <DownloadButton onClick={onClick} />
      </div>
    );
  }

  render() {
    const { columns, data, filename, paginated } = this.props;
    const options = {
      exportCSVBtn: this.renderDownloadButton,
      exportCSVSeparator: '\t',
      onPageChange: (page, size, title) => analytics.logTablePageEvent(title),
      onSizePerPageList: analytics.logTableSizeEvent,
      paginationShowsTotal: Utils.renderPaginationShowsTotal,
      paginationPanel: PaginationPanel,
      sizePerPageDropDown: Utils.renderSizePerPageDropDown,
      sizePerPageList: [10, 25, 100],
      toolbarPosition: 'bottom', //move download button to the bottom
    };
    return (
      <BootstrapTable
        bordered={false}
        csvFileName={filename}
        data={data}
        exportCSV
        maxHeight='400px'
        options={options}
        pagination={paginated}
        tableBodyClass='table-sm'
        tableHeaderClass='table-sm'
        version='4'
      >
        {
          columns.map((col, idx) => (
            <TableHeaderColumn
              className={col.className}
              columnClassName={col.columnClassName}
              csvFormat={col.asText}
              csvHeader={col.csvHeader || col.label}
              dataField={col.field}
              dataFormat={col.format}
              dataSort={col.sortable}
              export={col.export}
              filter={Utils.getTextFilter(col)}
              filterValue={col.filterText || col.asText}
              hidden={col.hidden}
              isKey={col.isKey}
              key={idx}
              sortFunc={getSortFunction(col)}
              width={col.width}
            >
              {col.label}
            </TableHeaderColumn>
          ))
        }
      </BootstrapTable>
    );
  }
}

LocalDataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  filename: PropTypes.string,
  paginated: PropTypes.bool,
};

export default LocalDataTable;
