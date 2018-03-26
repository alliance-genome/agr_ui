import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

import Utils from './utils';
import DownloadButton from './downloadButton';

const textSorter = (textRender, field) => {
  return (a, b, order) => {
    if (order === 'desc') {
      return textRender(a[field]).localeCompare(textRender(b[field]));
    } else {
      return textRender(b[field]).localeCompare(textRender(a[field]));
    }
  };
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
      sizePerPageList: [10, 25, 100],
      toolbarPosition: 'bottom', //move download button to the bottom
    };
    return (
      <BootstrapTable
        bordered={false}
        csvFileName={filename}
        data={data}
        exportCSV
        options={options}
        pagination={paginated}
        version='4'
      >
        {
          columns.map((col, idx) =>
            <TableHeaderColumn
              csvFormat={col.asText}
              csvHeader={col.label}
              dataField={col.field}
              dataFormat={col.format}
              dataSort={col.sortable}
              filter={Utils.getTextFilter(col)}
              filterValue={col.asText}
              isKey={col.isKey}
              key={idx}
              sortFunc={col.asText && textSorter(col.asText, col.field)}
            >
              {col.label}
            </TableHeaderColumn>
          )
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
