import type { Nullable, Nullish, Falsey } from './types.js';

/**
 * Checks whether the input is neither `null` nor `undefined`.
 *
 * @param input - The value to check.
 * @returns `true` if the input is defined and not null, narrowing its type to `T`.
 *
 * @example
 * const value: string | null = 'hello';
 * if (isNotNil(value)) {
 *   console.log(value.toUpperCase()); // value is narrowed to string
 * }
 */
export function isNotNil<T>(input: Nullable<T>): input is T {
  return !isNil(input);
}

/**
 * Checks whether the input is `null` or `undefined`.
 *
 * @param input - The value to check.
 * @returns `true` if the input is `null` or `undefined`, narrowing its type to `Nullish`.
 *
 * @example
 * const value: string | undefined = undefined;
 * if (isNil(value)) {
 *   console.log('Value is missing');
 * }
 */
export function isNil(input: unknown): input is Nullish {
  return input === undefined || input === null;
}

/**
 * Checks whether the input is a falsey value (`undefined`, `null`, `false`, `0`, or `''`).
 *
 * @param input - The value to check.
 * @returns `true` if the input is falsey, narrowing its type to `Falsey`.
 *
 * @example
 * isFalsey(0); // true
 * isFalsey(''); // true
 * isFalsey('hello'); // false
 */
export function isFalsey(input: unknown): input is Falsey {
  return (
    input === undefined ||
    input === null ||
    input === false ||
    input === 0 ||
    input === ''
  );
}

/**
 * Checks whether the input is not a falsey value (not `undefined`, `null`, `false`, `0`, or `''`).
 *
 * @param input - The value to check.
 * @returns `true` if the input is truthy, narrowing out `Falsey`.
 *
 * @example
 * const items = [0, 1, false, 'text', null];
 * const truthy = items.filter(isNotFalsey); // [1, 'text']
 */
export function isNotFalsey<T>(input: T | Falsey): input is T {
  return !isFalsey(input);
}
