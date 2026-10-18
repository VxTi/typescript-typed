import type {
  Falsey,
  EmptyArray,
  ExpandConstArrayExcl,
  ExpandConstArrayIncl,
  FilterConstArray,
  NonEmptyArray,
  Nullable,
} from './types.js';
import { isNil, isNotFalsey } from './nullable.js';

/**
 * Checks whether an array has at least `n` elements.
 *
 * Narrows the array type to guarantee elements up to index `n - 1` are defined.
 *
 * @param arr - The array to check.
 * @param n - The minimum required length.
 * @returns `true` if the array has at least `n` elements.
 *
 * @example
 * const items = ['a', 'b', 'c'];
 * if (hasArrayLengthAtLeast(items, 2)) {
 *   const [first, second] = items; // both typed as string, not string | undefined
 * }
 */
export function hasArrayLengthAtLeast<T, N extends number>(
  arr: T[],
  n: N,
): arr is T[] & ExpandConstArrayIncl<T, N> {
  return arr.length >= n;
}

/**
 * Checks whether an array is non-nil and has an exact length of `n`.
 *
 * Narrows the array to a fixed-length tuple of `n` elements.
 *
 * @param arr - The array to check.
 * @param n - The exact required length.
 * @returns `true` if the array has exactly `n` elements.
 *
 * @example
 * const items: string[] = ['a', 'b'];
 * if (hasArrayLength(items, 2)) {
 *   const [first, second] = items; // narrowed to fixed tuple [string, string]
 * }
 */
export function hasArrayLength<T, N extends number>(
  arr: Nullable<T[]>,
  n: N,
): arr is ExpandConstArrayExcl<T, N> {
  return !isNil(arr) && arr.length === n;
}

/**
 * Maps over a constant tuple or array while preserving its fixed-length tuple structure in the return type.
 *
 * @param arr - The constant array or tuple to map.
 * @param iterator - The mapping function applied to each element.
 * @returns A new array/tuple with mapped values and preserved tuple length.
 *
 * @example
 * const tuple = [1, 2, 3] as const;
 * const doubled = mapConstantArray(tuple, n => n * 2);
 * // doubled is typed as [number, number, number, ...number[]]
 */
export function mapConstantArray<T extends readonly any[], Res>(
  arr: T,
  iterator: (item: T[number]) => Res,
): T['length'] extends 0
  ? EmptyArray<Res>
  : T['length'] extends number
    ? ExpandConstArrayIncl<Res, T['length']>
    : Res[] {
  return arr.map(iterator) as never;
}

/**
 * Checks whether an array is non-nil and contains at least one element.
 *
 * @param arr - The array to check.
 * @returns `true` if the array is defined and non-empty, narrowing its type to `NonEmptyArray<T>`.
 *
 * @example
 * const users: User[] = getUsers();
 * if (isNonEmptyArray(users)) {
 *   const first = users[0]; // typed as User, not User | undefined
 * }
 */
export function isNonEmptyArray<T>(
  arr: Nullable<T[]>,
): arr is NonEmptyArray<T> {
  return !isNil(arr) && arr.length > 0;
}

/**
 * Checks whether an array is empty.
 *
 * @param arr - The array to check.
 * @returns `true` if the array has length 0, narrowing its type to `EmptyArray<T>`.
 *
 * @example
 * const items = [];
 * if (isEmptyArray(items)) {
 *   console.log('No items available');
 * }
 */
export function isEmptyArray<T>(arr: T[]): arr is EmptyArray<T> {
  return arr.length === 0;
}

/**
 * Filters the elements of a constant array based on a type guard predicate function.
 *
 * @param input - The constant array to filter.
 * @param predicate - A type guard function applied to each element.
 * @returns A filtered tuple containing only elements that satisfied the predicate.
 *
 * @example
 * const unfiltered = [0, 1, 2, 3, undefined, null] as const;
 * const filtered = filterConstArray(unfiltered, isNotNil);
 * // filtered is of type [0, 1, 2, 3]
 */
export function filterConstArray<
  const TIn extends readonly any[],
  TOut extends TIn[number],
>(
  input: TIn,
  predicate: (value: TIn[number]) => value is TOut,
): FilterConstArray<TIn, TOut> {
  return input.filter(predicate) as never;
}

/**
 * Filters out all falsey values (`undefined`, `null`, `false`, `0`, or `''`) from an array.
 *
 * @param arr - The array containing potentially falsey items.
 * @returns A new array containing only truthy elements.
 *
 * @example
 * const items = [0, 'hello', false, undefined, 'world'];
 * const clean = compact(items); // ['hello', 'world']
 */
export function compact(arr: Falsey[]): [];
export function compact<T>(
  arr: [Exclude<T, Falsey>, ...(T | Falsey)[]],
): NonEmptyArray<T>;
export function compact<T>(arr: (T | Falsey)[]): T[];
export function compact<T>(arr: (T | Falsey)[]): T[] {
  return arr.filter((item): item is T => isNotFalsey(item));
}
