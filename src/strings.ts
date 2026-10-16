import { isNil } from './nullable.js';
import type { NonEmptyString, Nullable, Nullish } from './types.js';

export function toNonEmptyString(
  input: Nullable<string>,
): Nullable<NonEmptyString> {
  return isNonEmptyString(input) ? input : undefined;
}

export function isNonEmptyString(
  input: Nullable<string>,
  trim: boolean = false,
): input is NonEmptyString {
  if (isNil(input)) return false;

  return (trim ? input.trim() : input).length > 0;
}

export function isEmptyString(
  input: Nullable<string>,
  trim: boolean = false,
): input is '' | Nullish {
  return isNil(input) || (trim ? input.trim() : input).length === 0;
}
