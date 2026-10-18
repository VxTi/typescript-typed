import type { MakeNonNullable, ObjectLike } from './types.js';
import { isNotNil } from './nullable.js';

/**
 * Returns an array of key-value pairs for an object, typed with keys preserved as `keyof T` and corresponding value types.
 *
 * @param input - The object whose enumerable own properties are to be returned.
 * @returns An array of key-value tuples with strongly typed keys and values.
 *
 * @example
 * const config = { host: 'localhost', port: 8080 };
 * const pairs = entries(config); // ['host' | 'port', string | number][]
 */
export function entries<TIn extends ObjectLike>(
  input: TIn,
): [string & keyof TIn, TIn[keyof TIn]][] {
  return Object.entries(input) as never;
}

/**
 * Returns an array of keys of the provided object, typed as `(string & keyof T)[]` instead of `string[]`.
 *
 * @param input - The object whose keys are to be returned.
 * @returns An array of keys typed to the object's keys.
 *
 * @example
 * const config = { host: 'localhost', port: 8080 };
 * const configKeys = keys(config); // ('host' | 'port')[]
 */
export function keys<T extends ObjectLike>(input: T): (string & keyof T)[];
export function keys<K extends PropertyKey>(input: Record<K, any>): K[];
export function keys<T extends ObjectLike>(input: T): (string & keyof T)[] {
  return Object.keys(input) as never;
}

/**
 * Transforms a list of key-value pairs into an object with strongly typed keys and values.
 *
 * @param entries - An array of `[key, value]` pairs.
 * @returns A new object populated from the provided entries.
 *
 * @example
 * const pairs: ['a' | 'b', number][] = [['a', 1], ['b', 2]];
 * const obj = fromEntries(pairs); // Record<'a' | 'b', number>
 */
export function fromEntries<K extends PropertyKey, V>(
  entries: [K, V][],
): Record<K, V>;
export function fromEntries<R extends ObjectLike>(
  entries: [string & keyof R, R[keyof R]][],
): R;
export function fromEntries<K extends PropertyKey, V>(
  entries: [K, V][],
): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

/**
 * Creates a shallow copy of an object omitting all properties whose values are `null` or `undefined`.
 *
 * @param input - The source object.
 * @returns A new object with all `null` and `undefined` properties removed, with types narrowed accordingly.
 *
 * @example
 * const user = { id: 1, name: 'Alice', bio: undefined, avatar: null };
 * const clean = omitNullishValues(user); // { id: number; name: string }
 */
export function omitNullishValues<Input extends ObjectLike>(
  input: Input,
): MakeNonNullable<Input> {
  return Object.fromEntries(
    Object.entries(input).filter(([_, v]) => isNotNil(v)),
  ) as MakeNonNullable<Input>;
}
