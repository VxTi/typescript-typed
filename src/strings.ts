import { isNil } from './nullable.js';
import {
  type SplitString,
  type NonEmptyString,
  type Nullable,
  type Nullish,
} from './types.js';

/**
 * Converts a nullable string into a `NonEmptyString` if it contains at least one character, or `undefined` otherwise.
 *
 * @param input - The string to evaluate.
 * @returns The original string typed as `NonEmptyString`, or `undefined` if empty or nil.
 *
 * @example
 * const name = toNonEmptyString('Alice'); // 'Alice' as NonEmptyString
 * const empty = toNonEmptyString(''); // undefined
 */
export function toNonEmptyString(
  input: Nullable<string>,
): Nullable<NonEmptyString> {
  return isNonEmptyString(input) ? input : undefined;
}

/**
 * Checks whether a string is non-nil and has a length greater than 0, optionally trimming whitespace.
 *
 * @param input - The string to check.
 * @param trim - Whether to trim whitespace before checking length (default: `false`).
 * @returns `true` if the string is non-empty, narrowing its type to `NonEmptyString`.
 *
 * @example
 * const str: string | undefined = 'hello';
 * if (isNonEmptyString(str)) {
 *   console.log(str); // str is narrowed to NonEmptyString
 * }
 *
 * isNonEmptyString('   ', true); // false
 */
export function isNonEmptyString(
  input: Nullable<string>,
  trim: boolean = false,
): input is NonEmptyString {
  if (isNil(input)) return false;

  return (trim ? input.trim() : input).length > 0;
}

/**
 * Checks whether a string is nullish (`null` or `undefined`) or empty (length === 0), optionally trimming whitespace.
 *
 * @param input - The string to check.
 * @param trim - Whether to trim whitespace before checking length (default: `false`).
 * @returns `true` if the string is nil or empty, narrowing its type to `'' | Nullish`.
 *
 * @example
 * isEmptyString(''); // true
 * isEmptyString(undefined); // true
 * isEmptyString('  ', true); // true
 * isEmptyString('hello'); // false
 */
export function isEmptyString(
  input: Nullable<string>,
  trim: boolean = false,
): input is '' | Nullish {
  return isNil(input) || (trim ? input.trim() : input).length === 0;
}

/**
 * Splits a string literal type by a delimiter, preserving string literal types in a tuple.
 *
 * @param input - The string to split.
 * @param split - The delimiter string.
 * @returns A tuple of substrings with literal type preservation.
 *
 * @example
 * const parts = split('a.b.c', '.'); // ['a', 'b', 'c']
 */
export function split<In extends string, T extends string>(
  input: In,
  split: T,
): SplitString<In, T> {
  return input.split(split) as SplitString<In, T>;
}
