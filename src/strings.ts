import { isNil } from './nullable';
import type { NonEmptyString, Nullable } from './types';

export function toNonEmptyString(
  input: Nullable<string>,
): NonEmptyString | undefined {
  return isNonEmptyString(input) ? input : undefined;
}

export function isNonEmptyString(
  input: Nullable<string>,
  trim: boolean = false,
): input is NonEmptyString {
  if (isNil(input)) return false;

  return trim ? input.trim().length > 0 : input.length > 0;
}
