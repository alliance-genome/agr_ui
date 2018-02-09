export default {
  getTextFilter(column) {
    return column.filterable ? {
      type: 'TextFilter',
      delay: 100,
      placeholder: column.label ? 'Filter by ' + column.label : ' '
    } : null;
  }
};
