# @vxti/typed

Small, dependency-free TypeScript helpers that keep your types narrow. Type guards, typed wrappers around `Object.*` and
utility types for arrays, strings, objects, and nullable values.

## Installation

```sh
pnpm add @vxti/typed
```

Requires Node.js 24 or newer. The package is ESM-only.

## API & Usage

All helpers and types can be imported directly from `@vxti/typed`:

```ts
import { isNotNil, isNonEmptyArray, entries, isNonEmptyString } from '@vxti/typed';
```

---

### Nullable Utilities (`src/nullable.ts`)

Helpers for checking and narrowing nullable or falsey values.

#### `isNotNil(value)`
Type guard that checks if a value is neither `null` nor `undefined`.

```ts
import { isNotNil } from '@vxti/typed';

const value: string | null = 'hello';
if (isNotNil(value)) {
  value.toUpperCase(); // value is narrowed to string
}
```

#### `isNil(value)`
Type guard that checks if a value is `null` or `undefined`.

```ts
import { isNil } from '@vxti/typed';

const input: string | undefined = undefined;
if (isNil(input)) {
  // input is undefined | null
}
```

#### `isFalsey(value)`
Type guard that checks if a value is falsey (`undefined`, `null`, `false`, `0`, or `''`).

```ts
import { isFalsey } from '@vxti/typed';

isFalsey(0); // true
isFalsey(''); // true
isFalsey('hello'); // false
```

#### `isNotFalsey(value)`
Type guard that checks if a value is truthy (not falsey).

```ts
import { isNotFalsey } from '@vxti/typed';

const items = [0, 1, false, 'text', null];
const truthy = items.filter(isNotFalsey); // [1, 'text']
```

---

### Array Utilities (`src/arrays.ts`)

Helpers and type guards for narrowing array lengths, tuple structures, and filtering elements.

#### `hasArrayLengthAtLeast(arr, n)`
Checks if an array has at least `n` elements, guaranteeing index access up to `n - 1`.

```ts
import { hasArrayLengthAtLeast } from '@vxti/typed';

const parts: string[] = ['a', 'b', 'c'];
if (hasArrayLengthAtLeast(parts, 2)) {
  const [first, second] = parts; // both typed as string, not string | undefined
}
```

#### `hasArrayLength(arr, n)`
Checks if an array is non-nil and has exact length `n`, narrowing to a fixed tuple.

```ts
import { hasArrayLength } from '@vxti/typed';

const items: string[] = ['a', 'b'];
if (hasArrayLength(items, 2)) {
  const [first, second] = items; // narrowed to [string, string]
}
```

#### `isNonEmptyArray(arr)`
Checks if an array is non-nil and has at least one element (`NonEmptyArray<T>`).

```ts
import { isNonEmptyArray } from '@vxti/typed';

const users: User[] = getUsers();
if (isNonEmptyArray(users)) {
  users[0]; // User, not User | undefined
}
```

#### `isEmptyArray(arr)`
Checks if an array is empty (`EmptyArray<T>`).

```ts
import { isEmptyArray } from '@vxti/typed';

if (isEmptyArray(items)) {
  // items is []
}
```

#### `mapConstantArray(arr, iterator)`
Maps over a constant tuple/array while preserving fixed-length tuple types.

```ts
import { mapConstantArray } from '@vxti/typed';

const doubled = mapConstantArray([1, 2, 3] as const, (n) => n * 2);
// [number, number, number, ...number[]]
```

#### `filterConstArray(arr, predicate)`
Filters elements of a constant array based on a type guard predicate.

```ts
import { filterConstArray, isNotNil } from '@vxti/typed';

const unfiltered = [0, 1, 2, 3, undefined, null] as const;
const filtered = filterConstArray(unfiltered, isNotNil); // [0, 1, 2, 3]
```

#### `compact(arr)`
Filters out all falsey values from an array.

```ts
import { compact } from '@vxti/typed';

const clean = compact([0, 'hello', false, undefined, 'world']); // ['hello', 'world']
```

---

### Object Utilities (`src/objects.ts`)

Typed wrappers around standard `Object` methods.

#### `keys(obj)`
Returns object keys typed as `(string & keyof T)[]` instead of `string[]`.

```ts
import { keys } from '@vxti/typed';

const config = { host: 'localhost', port: 8080 };
const configKeys = keys(config); // ('host' | 'port')[]
```

#### `entries(obj)`
Returns object entries with strongly-typed keys and values.

```ts
import { entries } from '@vxti/typed';

const config = { host: 'localhost', port: 8080 };
const configEntries = entries(config); // ['host' | 'port', string | number][]
```

#### `fromEntries(entries)`
Transforms key-value pairs into an object with strongly-typed keys and values.

```ts
import { fromEntries } from '@vxti/typed';

const pairs: ['a' | 'b', number][] = [['a', 1], ['b', 2]];
const obj = fromEntries(pairs); // Record<'a' | 'b', number>
```

#### `omitNullishValues(obj)`
Creates a shallow copy omitting properties whose values are `null` or `undefined`.

```ts
import { omitNullishValues } from '@vxti/typed';

const user = { id: 1, name: 'Alice', bio: undefined, avatar: null };
const clean = omitNullishValues(user); // { id: number; name: string }
```

---

### String Utilities (`src/strings.ts`)

Helpers for string validation, narrowing, and type-level splitting.

#### `isNonEmptyString(str, trim?)`
Type guard that checks if a string is non-nil and has length > 0 (with optional trimming).

```ts
import { isNonEmptyString } from '@vxti/typed';

function greet(name?: string) {
  if (isNonEmptyString(name, true)) {
    return `Hello, ${name}`; // name is narrowed to NonEmptyString
  }
  return 'Hello, stranger';
}
```

#### `isEmptyString(str, trim?)`
Type guard that checks if a string is nullish or empty (with optional trimming).

```ts
import { isEmptyString } from '@vxti/typed';

isEmptyString(''); // true
isEmptyString(undefined); // true
isEmptyString('  ', true); // true
```

#### `toNonEmptyString(str)`
Converts a nullable string to `NonEmptyString` if non-empty, or `undefined` otherwise.

```ts
import { toNonEmptyString } from '@vxti/typed';

const name = toNonEmptyString('Alice'); // 'Alice' as NonEmptyString
const empty = toNonEmptyString(''); // undefined
```

#### `split(str, delimiter)`
Splits a string literal by a delimiter, preserving string literal types in a tuple.

```ts
import { split } from '@vxti/typed';

const parts = split('foo,bar,baz', ','); // ['foo', 'bar', 'baz']
```

---

### Utility Types (`src/types.ts`)

Exported TypeScript types for common narrowing and data structures:

| Type | Description |
| :--- | :--- |
| `Nullish` | `undefined \| null` |
| `Nullable<T>` | `T \| undefined \| null` |
| `Falsey` | `Nullish \| '' \| 0 \| false` |
| `Primitive` | `string \| boolean \| number \| undefined \| null \| bigint` |
| `NonEmptyString` | Branded string type for non-empty strings |
| `NonEmptyArray<T>` | `[T, ...T[]]` |
| `EmptyArray<T>` | `[] & T[]` |
| `MaybeArray<T>` | `T \| T[]` |
| `MaybeReadonlyArray<T>` | `T[] \| readonly T[]` |
| `MakeNonNullable<T>` | Omits nullish keys from an object type |
| `Prettify<T>` | Flattens complex intersection types for IDE display |
| `ObjectLike` | `{ [s: string]: any } \| ArrayLike<any>` |
| `MaybePromise<T>` | `T \| PromiseLike<T>` |
| `MaybePartial<T>` | `T \| Partial<T>` |
| `SplitString<TIn, TSplit>` | Recursive tuple type of string literal split by delimiter |
| `FilterConstArray<TIn, R>` | Filters constant tuple type elements by type `R` |

---

## Strict tsconfig

The package ships a `tsconfig.strict.json` with a set of stricter compiler options that pair well with these helpers
(most notably `noUncheckedIndexedAccess`). Extend it from your own `tsconfig.json`:

```json
{
  "extends": "@vxti/typed/tsconfig.strict.json",
  "compilerOptions": {
    // your own options
  }
}
```

It enables:

- `strict`
- `noUncheckedIndexedAccess`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `noUnusedLocals`
- `noUnusedParameters`

Need multiple base configs? TypeScript 5+ accepts an array:
`"extends": ["@vxti/typed/tsconfig.strict.json", "./tsconfig.base.json"]`.

## License

MIT
