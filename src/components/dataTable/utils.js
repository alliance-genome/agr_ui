import React from 'react';
import style from './style.css';

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
  }
};
