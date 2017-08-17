import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';

import style from './style.css';

const textSorter = (textRender, field) => {
  return (a, b, order) => {
    if (order === 'desc') {
      return textRender(a[field]).localeCompare(textRender(b[field]));
    } else {
      return textRender(b[field]).localeCompare(textRender(a[field]));
    }
  };
};

const textFilter = {
  type: 'TextFilter',
  delay: 100,
  placeholder: ' '
};

class LocalDataTable extends Component {
  constructor(props) {
    super(props);
  }

  renderBottomPanel(props) {
    return (
      <div>
        {
          this.props.paginated &&
          <div className='row'>
            <div className='col-xs-6'>
              { props.components.sizePerPageDropdown }
            </div>
            <div className={`col-xs-6 ${style.pageListContainer}`}>
              { props.components.pageList }
            </div>
          </div>
        }
        {
          this.props.filename &&
          <div className='row'>
            <div className='col-xs-12'>
              <ExportCSVButton
                btnContextual='btn-secondary'
                btnText='Download'
                onClick={() => this.tableRef.handleExportCSV()}
              />
            </div>
          </div>
        }
      </div>
    );
  }

  render() {
    const { columns, data, filename } = this.props;
    const options = {
      exportCSVSeparator: '\t',
      exportCSVText: 'Download',
      paginationPanel: this.renderBottomPanel.bind(this),
      sizePerPage: this.pagination ? 10 : 99999999,
    };
    return (
      <BootstrapTable
        bordered={false}
        csvFileName={filename}
        data={data}
        options={options}
        pagination
        ref={(table) => {this.tableRef = table;}}
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
              filter={col.filterable ? textFilter : null}
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
