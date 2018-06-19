import React from 'react';
import style from './style.scss';

import { SizePerPageDropDown } from 'react-bootstrap-table';

export default {
  getTextFilter(column) {
    return column.filterable ? {
      type: 'TextFilter',
      delay: 100,
      placeholder: column.label ? 'Filter by ' + column.label : ' '
    } : null;
  },

  renderPaginationShowsTotal(start, end, total) {
    return (
      <p className={style.remoteDataTablePaginationShowsTotal}>
        { start } to { end }, of { total } results.
      </p>
    );
  },

  // eslint-disable-next-line react/no-multi-comp
  renderSizePerPageDropDown() {
    return (
      <SizePerPageDropDown btnContextual='btn-outline-secondary' />
    );
  }
};
