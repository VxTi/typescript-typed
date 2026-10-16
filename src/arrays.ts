import type {
  EmptyArray,
  ExpandConstArrayExcl,
  ExpandConstArrayIncl,
  MaybeReadonlyArray,
  NonEmptyArray,
  Nullable,
} from './types.js';
import { isNil } from './nullable.js';

export function hasArrayLengthAtLeast<T, N extends number>(
  arr: T[],
  n: N,
): arr is T[] & ExpandConstArrayIncl<T, N> {
  return arr.length >= n;
}

export function hasArrayLength<T, N extends number>(
  arr: Nullable<T[]>,
  n: N,
): arr is ExpandConstArrayExcl<T, N> {
  return !isNil(arr) && arr.length === n;
}

// Type safe map for arrays with statically known sizes
type Iterator<TIn extends MaybeReadonlyArray<unknown>, Res> = (
  item: TIn[number],
) => Res;
export function mapConstantArray<T extends readonly any[], Res>(
  arr: T,
  iterator: Iterator<T, Res>,
): T['length'] extends 0
  ? EmptyArray<Res>
  : T['length'] extends number
    ? ExpandConstArrayIncl<Res, T['length']>
    : Res[] {
  return arr.map(iterator) as never;
}

export function isNonEmptyArray<T>(
  arr: Nullable<T[]>,
): arr is NonEmptyArray<T> {
  return !isNil(arr) && arr.length > 0;
}
export function isEmptyArray<T>(arr: T[]): arr is EmptyArray<T> {
  return arr.length === 0;
}
