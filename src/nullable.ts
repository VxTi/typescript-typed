import type { Nullable, Nullish } from './types.js';

export function isNotNil<T>(input: Nullable<T>): input is T {
  return !isNil(input);
}

export function isNil(input: unknown): input is Nullish {
  return input === undefined || input === null;
}
