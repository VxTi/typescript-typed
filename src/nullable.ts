import type { Nullable, Nullish } from './types';

export function isNotNil<T>(input: Nullable<T>): input is T {
  return !isNil(input);
}

export function isNil(input: unknown): input is Nullish {
  return typeof input === 'undefined';
}
