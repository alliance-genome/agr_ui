export function compareAlphabeticalCaseInsensitive(accessor) {
  accessor = accessor || (val => val);
  return function (a, b) {
    return accessor(a).toLowerCase().localeCompare(accessor(b).toLowerCase());
  };
}
