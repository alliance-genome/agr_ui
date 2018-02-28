import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import PropTypes from 'prop-types';

import Utils from './utils';

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

    this.createCustomToolbar = this.createCustomToolbar.bind(this);

  }

  createCustomToolbar() {
    return (
      <div className='btn-group' role='group'>
        <ExportCSVButton btnContextual={'btn-primary'} btnGlyphicon='' btnText='Download' />
      </div>
    );
  }

  render() {
    const { columns, data, filename, paginated } = this.props;
    const options = {
      exportCSVSeparator: '\t',
      sizePerPageList: [10, 25, 100],
      toolBar: this.createCustomToolbar,
      toolbarPosition: 'bottom', //move download button to the bottom
    };
    return (
      <BootstrapTable
        bordered={false}
        csvFileName={filename}
        data={data}
        enableExportCSV
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
