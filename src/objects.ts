import type { Nullable, MakeNonNullable, MaybePartial } from './types.js';
import { isNotNil } from './nullable.js';

export function entries<TKey extends PropertyKey, TValue>(
  input: MaybePartial<Record<TKey, TValue>>,
): [TKey, TValue][];
export function entries<TKey extends PropertyKey, TValue>(
  input: MaybePartial<Record<TKey, Nullable<TValue>>>,
): [TKey, Nullable<TValue>][];
export function entries<TKey extends PropertyKey, TValue>(
  input: MaybePartial<Record<TKey, Nullable<TValue>>>,
): [TKey, Nullable<TValue>][] {
  return Object.entries(input) as never;
}

export function keys<TKey extends PropertyKey>(
  input: Record<TKey, unknown>,
): TKey[] {
  return Object.keys(input) as never;
}

export function fromEntries<K extends PropertyKey, V>(
  entries: [K, V][],
): Record<K, V>;
export function fromEntries<K extends PropertyKey, V>(
  entries: [K, Nullable<V>][],
): Record<K, Nullable<V>>;
export function fromEntries<K extends PropertyKey, V>(
  entries: [K, Nullable<V>][],
): Record<K, Nullable<V>> {
  return Object.fromEntries(entries) as Record<K, V>;
}

export function omitNullishValues<Input extends Record<PropertyKey, any>>(
  input: Input,
): MakeNonNullable<Input> {
  return fromEntries(entries(input).filter(([_, v]) => isNotNil(v))) as never;
}
