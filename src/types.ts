export type Nullish = undefined | null;
export type Nullable<T> = T | Nullish;
export type Primitive = string | boolean | number | undefined | null | bigint;

/* Object types */
export type Prettify<T> = {
  [K in keyof T as PropertyKey extends K ? never : K]: T[K];
} & {};

export type MaybePromise<T> = T | PromiseLike<T>;
export type MaybePartial<T> = T | Partial<T>;
export type NonEmptyString = string & { readonly __tag: unique symbol };

export type ExcludeIndexSignature<T> = {
  [K in keyof T as K extends PropertyKey ? never : K]: T[K];
};

export type MakeNonNullable<T> = Prettify<{
  [K in keyof T as T[K] extends Nullish ? never : K]: T[K];
}>;

/* Array types */
export type NonEmptyArray<T> = [T, ...T[]];
export type EmptyArray<T> = [] & T[];
export type MaybeArray<T> = T | T[];
export type MaybeReadonlyArray<T> = T[] | readonly T[];
export type ExpandConstArrayExcl<
  T,
  N extends number,
  Acc extends unknown[] = [],
> = [number] extends [N]
  ? T[]
  : Acc['length'] extends N
    ? Acc
    : ExpandConstArrayExcl<T, N, [...Acc, T]>;

export type ExpandConstArrayIncl<T, N extends number> = [
  ...ExpandConstArrayExcl<T, N>,
  ...T[],
];

export type SplitString<
  TIn extends string,
  TSplit extends string,
> = TIn extends `${infer TFirst}${TSplit}${infer TRest}`
  ? [TFirst, ...SplitString<TRest, TSplit>]
  : [TIn];

export type FilterConstArray<
  TIn extends readonly any[],
  R,
> = TIn extends readonly [infer TFirst, ...infer TRest]
  ? TFirst extends R
    ? [TFirst, ...FilterConstArray<TRest, R>]
    : FilterConstArray<TRest, R>
  : [];
export type Filtered<In, Type> = Extract<In, Type>;
