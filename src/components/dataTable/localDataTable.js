import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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
  render() {
    const { columns, data, filename } = this.props;
    const options = {
      exportCSVSeparator: '\t',
      exportCSVText: 'Download',
    };
    return (
      <BootstrapTable
        bordered={false}
        csvFileName={filename}
        data={data}
        exportCSV
        options={options}
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
  filename: PropTypes.string
};

export default LocalDataTable;
