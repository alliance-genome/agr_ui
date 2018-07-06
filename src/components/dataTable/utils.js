import React from 'react';

import { SizePerPageDropDown } from 'react-bootstrap-table';

export default {
  getTextFilter(column) {
    return column.filterable ? {
      type: 'TextFilter',
      delay: 300,
      placeholder: column.label ? 'Filter by ' + column.label : ' '
    } : null;
  },

  renderPaginationShowsTotal(start, end, total) {
    return <span>Showing { start } - { end } of { total } rows</span>;
  },

  // eslint-disable-next-line react/no-multi-comp
  renderSizePerPageDropDown() {
    return (
      <SizePerPageDropDown btnContextual='btn-outline-secondary' />
    );
  }
};
