import { type DeepKeysMaxDepth, type TypeByPath } from '../types';

/**
 * Returns the value/reference within an item based on a given path
 *
 * @remarks
 * This function can take in any item -- primitive, array, or object. It is most useful with arrays and objects, however.
 * The path is a string in the form of a js path. (i.e. thing.foo.bar, or foo[0].bar).
 * It also supports creating undefined paths, including pushing to an array when no index is provided (i.e. foo[]).
 * NOTE: Although the function will return references instead of values, all primitives in JavaScript are values, so
 * if the item at the path given is a primitive, a value will be returned instead of a reference.
 * NOTE: Currently only supports 1D arrays. (i.e. foo[0][1] will NOT work)
 *
 * @param item - The thing we are searching in
 * @param path - The place we are looking at. (Supports js path rules, and empty [] for pushing to an array).
 * @param createUndefinedPaths - Optional. When true, the function will create values for any place in the path that is undefined. Defaults to false.
 * @returns The reference to or value of the item located at the path specified, in the item provided.
 *
 * @beta
 */

//TODO: better typescript types (see ChildPath stuff in new interactive tables) need to combine with indexing, ND arrays

export const getByPath = <
  Type extends any,
  Path extends DeepKeysMaxDepth<Type, MaxDepth>,
  MaxDepth extends number = 10,
>(
  item: Type,
  path: Path,
  createUndefinedPaths = false
): TypeByPath<Type, Path> => {
  const keys = path.split('.');

  let pathObject: any = item;

  keys.forEach((key, index) => {
    if (key === '') return;
    if (typeof pathObject !== 'object' || pathObject === null)
      throw new Error(`Key "${keys[index - 1]}" in path "${path}" is not an object. Property "${key}" cannot be read.`);

    /**
     * TODO: support n-D arrays (i.e. foo[0][1][2]...)
     *  match all indices with (?<=(.*))\[(\d*)] (results in capture group 2)
     *  maybe can do conditional first capture to avoid capturing "keys" like
     *  foo, foo[0]. foo[0][1]. (make first capture group at start of line, then OR it with a
     *  non-capture group of the same nature. Psuedoregex: (?<=(^.*)|(?:.*))\d[(\d+)]
     *  alternatively, capture all indices, and regex again to match each individually
     */
    const match = /(.*)\[(\d*)]$/.exec(key);

    if (match) {
      const [, arrayKey, arrayIndex] = match;
      if (createUndefinedPaths && arrayKey !== '' && pathObject[arrayKey] === undefined) {
        pathObject[arrayKey] = [];
      }
      if (arrayKey !== '') {
        pathObject = pathObject[arrayKey];
      }
      if (arrayIndex) {
        if (createUndefinedPaths && pathObject[arrayIndex] === undefined) {
          pathObject[arrayIndex] = {};
        }
        pathObject = pathObject[arrayIndex];
      } else {
        pathObject.push({});
        pathObject = pathObject[pathObject.length - 1];
      }
    } else {
      if (createUndefinedPaths && pathObject[key] === undefined) {
        pathObject[key] = {};
      }
      pathObject = pathObject[key];
    }
  });

  return pathObject;
};

export const getAllByPath = <
  Type extends any,
  MaxDepth extends number = 10,
  Path extends DeepKeysMaxDepth<Type, MaxDepth> = DeepKeysMaxDepth<Type, MaxDepth>,
  TargetType = TypeByPath<Type, Path>,
>(
  item: Type,
  path: Path
): TargetType | TargetType[] => {
  if (path === '') throw new Error('Path must be a deep key of the item being searched');

  const firstPeriodIndex = path.indexOf('.');

  let key = path as keyof Type;
  let remainingKeys = '';
  if (firstPeriodIndex !== -1) {
    key = path.substring(0, firstPeriodIndex) as keyof Type;
    remainingKeys = path.substring(firstPeriodIndex + 1);
  }

  if (Array.isArray(item)) {
    return item
      .map((subItem) => getAllByPath<typeof subItem, MaxDepth, Path>(subItem, path) as TargetType | TargetType[])
      .flat() as TargetType[];
  }

  if (item === null || typeof item !== 'object')
    throw new Error(
      `Key "${String(key)}" in path "${path}" is not an object or array. Property "${String(key)}" cannot be read.`
    );

  const nextItem = item[key] as TargetType;

  if (remainingKeys === '') {
    return nextItem;
  }

  return getAllByPath(nextItem, remainingKeys as DeepKeysMaxDepth<typeof nextItem>) as TargetType | TargetType[];
};

export default getByPath;
