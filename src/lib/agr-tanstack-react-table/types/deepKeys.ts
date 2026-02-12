import { type OnlyArrayOfObjects, type OnlyNonArrayOfObjects } from './arrays';

export type DeepKeysMaxDepth<
  T,
  MaxDepth extends number = 10,
  TDepth extends any[] = [],
> = TDepth['length'] extends MaxDepth
  ? never
  : unknown extends T
    ? string
    : T extends any[]
      ? DeepKeysMaxDepth<T[number], MaxDepth, [...TDepth, any]>
      : T extends object
        ? (keyof T & string) | DeepKeysMaxDepthPrefix<T, keyof T, MaxDepth, TDepth>
        : never;

export type DeepKeysMaxDepthPrefix<
  T,
  TPrefix,
  MaxDepth extends number,
  TDepth extends any[],
> = TPrefix extends keyof T & (number | string)
  ? `${TPrefix}.${DeepKeysMaxDepth<T[TPrefix], MaxDepth, [...TDepth, any]> & string}`
  : never;

export type DeepKeysOfNonObjectArrayTypes<T, TDepth extends any[] = []> = TDepth['length'] extends 5
  ? never
  : unknown extends T
    ? string
    : T extends any[]
      ? DeepKeysOfNonObjectArrayTypes<T[number], [...TDepth, any]>
      : T extends object
        ? (keyof OnlyNonArrayOfObjects<T> & string) | DeepKeysOfNonObjectArrayTypesPrefix<T, keyof T, TDepth>
        : never;

export type DeepKeysOfObjectArrayTypes<T, TDepth extends any[] = []> = TDepth['length'] extends 5
  ? never
  : unknown extends T
    ? string
    : T extends any[]
      ? DeepKeysOfObjectArrayTypes<T[number], [...TDepth, any]>
      : T extends object
        ? (keyof OnlyArrayOfObjects<T> & string) | DeepKeysOfObjectArrayTypesPrefix<T, keyof T, TDepth>
        : never;

export type DeepKeysOfNonObjectArrayTypesPrefix<T, TPrefix, TDepth extends any[]> = TPrefix extends keyof T &
  (number | string)
  ? `${TPrefix}.${DeepKeysOfNonObjectArrayTypes<T[TPrefix], [...TDepth, any]> & string}`
  : never;

export type DeepKeysOfObjectArrayTypesPrefix<T, TPrefix, TDepth extends any[]> = TPrefix extends keyof T &
  (number | string)
  ? `${TPrefix}.${DeepKeysOfObjectArrayTypes<T[TPrefix], [...TDepth, any]> & string}`
  : never;
