import React from 'react';

export default {
  renderPaginationShowsTotal(start, end, total) {
    return <span>Showing { start } - { end } of { total } rows</span>;
  },
};
