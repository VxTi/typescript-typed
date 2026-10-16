# @vxti/typed

Small, dependency-free TypeScript helpers that keep your types narrow. Type guards, typed wrappers around `Object.*` and utility types for arrays, strings and nullable values.

## Installation

```sh
pnpm add @vxti/typed
```

Requires Node.js 24 or newer. The package is ESM-only.

## What's included

| Area      | Exports                                                                                    |
| --------- | ------------------------------------------------------------------------------------------ |
| Nullable  | `isNil`, `isNotNil`                                                                        |
| Strings   | `isNonEmptyString`, `isEmptyString`, `toNonEmptyString`                                    |
| Arrays    | `isNonEmptyArray`, `isEmptyArray`, `hasArrayLength`, `hasArrayLengthAtLeast`, `mapConstantArray` |
| Objects   | `entries`, `keys`, `fromEntries`, `omitNullishValues`                                      |
| Types     | `Nullable`, `Nullish`, `NonEmptyString`, `NonEmptyArray`, `EmptyArray`, `MaybeArray`, `MaybePromise`, `Prettify`, `MakeNonNullable`, … |

## Examples

**Filter out missing values**

```ts
import { isNotNil } from '@vxti/typed';

const ids = [1, undefined, 3].filter(isNotNil); // number[]
```

**Narrow strings**

```ts
import { isNonEmptyString } from '@vxti/typed';

function greet(name?: string) {
  if (isNonEmptyString(name, true)) {
    return `Hello, ${name}`; // name: NonEmptyString
  }
  return 'Hello, stranger';
}
```

**Safely access array elements**

```ts
import { isNonEmptyArray, hasArrayLengthAtLeast } from '@vxti/typed';

if (isNonEmptyArray(users)) {
  users[0]; // User, not User | undefined
}

if (hasArrayLengthAtLeast(parts, 2)) {
  const [first, second] = parts; // both defined
}
```

**Map over fixed-size tuples**

```ts
import { mapConstantArray } from '@vxti/typed';

const doubled = mapConstantArray([1, 2, 3] as const, (n) => n * 2);
// [number, number, number, ...number[]]
```

**Typed object helpers**

```ts
import { entries, keys, omitNullishValues } from '@vxti/typed';

const config = { host: 'localhost', port: 8080 };

keys(config); // ('host' | 'port')[]
entries(config); // ['host' | 'port', string | number][]

omitNullishValues({ a: 1, b: undefined }); // { a: number }
```

## Strict tsconfig

The package ships a `tsconfig.strict.json` with a set of stricter compiler options that pair well with these helpers (most notably `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`). Extend it from your own `tsconfig.json`:

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
- `exactOptionalPropertyTypes`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `noUnusedLocals`
- `noUnusedParameters`

Need multiple base configs? TypeScript 5+ accepts an array: `"extends": ["@vxti/typed/tsconfig.strict.json", "./tsconfig.base.json"]`.

## License

MIT
