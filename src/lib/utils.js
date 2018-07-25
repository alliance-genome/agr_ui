export function makeId(string) {
  return string.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
}

export function stripHtml (string) {
  if (!string) {
    return '';
  }
  return string.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '').trim();
}

export function compareAlphabeticalCaseInsensitive(accessor) {
  accessor = accessor || (val => val);
  return function (a, b) {
    return accessor(a).toLowerCase().localeCompare(accessor(b).toLowerCase());
  };
}

export function buildTableQueryString(options) {
  const filterQueries = options.filters && options.filters
    .map(filter => `${filter.name}=${filter.value}`)
    .join('&');
  return `page=${options.page}&limit=${options.limit}&sortBy=${options.sort.name}&asc=${options.sort.order === 'asc'}&${filterQueries}`;
}
