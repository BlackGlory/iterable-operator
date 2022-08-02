# iterable-operator
Utilities for JavaScript `Iterable` and `AsyncIterable`.

## Install
```sh
npm install --save iterable-operator
# or
yarn add iterable-operator
```

## Usage
```js
import { map, toArray } from 'iterable-operator'

const iter = [1, 2, 3]
const doubleIter = map(iter, x => x * 2)
const result = toArray(doubleIter)
```

### Chaining
```js
import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining'

const result = new IterableOperator([1, 2, 3])
  .map(x => x * 2)
  .toArray()
```

### Binding
It is prepared for [bind-operator].

[bind-operator]: https://github.com/tc39/proposal-bind-operator

```js
import { map, toArray } from 'iterable-operator/lib/es2018/style/binding'

const result = [1, 2, 3]
  ::map(x => x * 2)
  ::toArray()
```

### Pipeline
It is prepared for [pipeline-operator].

[pipeline-operator]: https://github.com/tc39/proposal-pipeline-operator

```js
import { map, toArray } from 'iterable-operator/lib/es2018/style/pipeline'

const result = [1, 2, 3]
  |> map(x => x * 2)
  |> toArray()
```

## API
There are two kinds of operators:
- Intermediate operation(middleware): lazy, the first parameter is Iterable, the return value is Iterable(Iterable in, Iterable out)
- Terminal operation(output): the first parameter is Iterable

### Middleware
#### chunk, chunkAsync
```ts
function chunk<T>(
  iterable: Iterable<T>
, size: number // size > 0
): Iterable<T[]>
function chunkAsync<T>(
  iterable: AsyncIterable<T>
, size: number // size > 0
): AsyncIterable<T[]>
```

```js
chunk([1, 2, 3], 2) // [[1, 2], [3]]
chunk([1, 2, 3], 3) // [[1, 2, 3]]
chunk([1, 2, 3], 5) // [[1, 2, 3]]
chunk([1, 2, 3], 0) // throw Error
chunk([1, 2, 3], -1) // throw Error
```

The memory usage of this function depends on `size`.

#### chunkBy, chunkByAsync
```ts
function chunkBy<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<T[]>
function chunkByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<T[]>
```

```js
chunkBy([1, 2, 3], x => x === 2) // [[1, 2], [3]]
chunkBy([1, 2, 3], x => x === 3) // [[1, 2, 3]]
chunkBy([1, 2, 3], x => x === 5) // [[1, 2, 3]]
```

The memory usage of this function depends on `iterable` and `predicate`.

#### concat, concatAsync
```ts
function concat<T, U>(
  iterable: Iterable<T>
, ...otherIterables: Iterable<U>[]
): Iterable<T | U> {
function concatAsync<T, U>(
  iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
, ...otherIterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
): AsyncIterable<T | U> {
```

```js
concat([1, 2, 3]) // [1, 2, 3]
concat([1, 2, 3], ['a', 'b', 'c']) // [1, 2, 3, 'a', 'b', 'c']
```

#### drop, dropAsync
```ts
function drop<T>(
  iterable: Iterable<T>
, count: number // count >= 0
): Iterable<T>
function dropAsync<T>(
  iterable: AsyncIterable<T>
, count: number // count >= 0
): AsyncIterable<T>
```

```js
drop([1, 2, 3], 0) // [1, 2, 3]
drop([1, 2, 3], 2) // [3]
drop([1, 2, 3], 3) // []
drop([1, 2, 3], 5) // []
drop([1, 2, 3], -1) // throw Error
```

#### dropRight, dropRightAsync
```ts
function dropRight<T>(
  iterable: Iterable<T>
, count: number // count >= 0
): Iterable<T>
function dropRightAsync<T>(
  iterable: AsyncIterable<T>
, count: number // count >= 0
): AsyncIterable<T>
```

```js
dropRight([1, 2, 3], 0) // [1, 2, 3]
dropRight([1, 2, 3], 2) // [1]
dropRight([1, 2, 3], 3) // []
dropRight([1, 2, 3], 5) // []
dropRight([1, 2, 3], -1) // throw Error
```

The memory usage of this function depends on `iterable`.

#### dropUntil, dropUntilAsync
```ts
function dropUntil<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<T>
function dropUntilAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<boolean>
): AsyncIterable<T>
```

```js
dropUntil([1, 2, 3], x => x === 2) // [2, 3]
```

The memory usage of this function depends on `iterable` and `predicate`.

#### filter, filterAsync
```ts
function filter<T, U extends T = T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<U>
function filterAsync<T, U extends T = T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<U>
```

```js
filter([1, 2, 3], x => x % 2 === 1) // [1, 3]
```

#### flatten, flattenAsync
```ts
function flatten<T>(iterable: Iterable<unknown>): Iterable<T>
function flattenAsync<T>(iterable: AsyncIterable<unknown>): AsyncIterable<T>
```

```js
flatten([]) // []
flatten('123') // ['1', '2', '3']
flatten(['one', ['two'], 0, [1, [2]]]) // ['o', 'n', 'e', 'two', 0, 1, [2]]
```

#### flattenDeep, flattenDeepAsync
```ts
function flattenDeep<T>(
  iterable: Iterable<unknown>
, depth: number = Infinity // depth >= 0
): Iterable<T>
function flattenDeepAsync<T>(
  iterable: AsyncIterable<unknown>
, depth: number = Infinity // depth >= 0
): AsyncIterable<T>
```

```js
flattenDeep([]) // []
flattenDeep('123') // ['1', '2', '3']
flattenDeep([], -1) // throw Error
flattenDeep([0, [1]], 0) // [0, [1]]
flattenDeep(['one', ['two', ['three']], 0, [1, [2, [3]]]], 2) // ['o', 'n', 'e', 't', 'w', 'o', 'three', 0, 1, 2, [3]]
```

#### flattenBy, flattenByAsync
```ts
function flattenBy<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => boolean
): Iterable<T>
function flattenByAsync<T>(
  iterable: Iterable<unknown> | AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
): AsyncIterable<T>
```

```js
flattenBy(['one', ['two'], 0, [1]], x => typeof x !== 'string') // ['one', 'two', 0, 1]
flattenBy([], () => true) // []
flattenBy('123', () => true) // ['1', '2', '3']
```

#### map, mapAsync
```ts
function map<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => U
): Iterable<U>
function mapAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterable<U>
```

```js
map([1, 2, 3], x => x * 2) // [2, 4, 6]
```

#### repeat, repeatAsync
```ts
function repeat<T>(
  iterable: Iterable<T>
, times: number // times >= 0
): Iterable<T>
function repeatAsync<T>(
  iterable: AsyncIterable<T>
, times: number // times >= 0
): AsyncIterable<T>
```

```js
repeat([1, 2, 3], 2) // [1, 2, 3, 1, 2, 3]
repeat([1, 2, 3], 0) // []
repeat([1, 2, 3], -1) // throw Error
```

The memory usage of this function depends on `iterable`.

#### slice, sliceAsync
```ts
function slice<T>(
  iterable: Iterable<T>
, start: number // start >= 0
, end: number = Infinity // end >= start
): Iterable<T>
function sliceAsync<T>(
  iterable: AsyncIterable<T>
, start: number // start >= 0
, end: number = Infinity // end >= start
): AsyncIterable<T>
```

```js
slice([1, 2, 3], -1, 1) // throw Error
slice([1, 2, 3], 3, 5) // []
slice([1, 2, 3], 1, 2) // [2]
slice([1, 2, 3], 1, 1) // []
slice([1, 2, 3], 2, 1) // throw Error
```

#### split, splitAsync
```ts
function split<T>(iterable: Iterable<T>, separator: T): Iterable<T[]>
function splitAsync<T>(
  iterable: AsyncIterable<T>
, separator: T
): AsyncIterable<T[]>
```

```js
split([1, 2, 3, 4, 5], 3) // [[1, 2], [4, 5]]
split([1, 2, 3, 4, 5], 1) // [[], [2, 3, 4, 5]]
split([1, 2, 3, 4, 5], 5) // [[1, 2, 3, 4], []]
split([1, 2, 3, 4, 5], 0) // [[1, 2, 3, 4, 5]]
```

The memory usage of this function depends on `iterable` and `separator`.

#### splitBy, splitByAsync
```ts
function splitBy<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<T[]>
function splitByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<T[]>
```

```js
splitBy([1, 2, 3, 4, 5], x => x === 3) // [[1, 2], [4, 5]]
splitBy([1, 2, 3, 4, 5], x => x === 1) // [[], [2, 3, 4, 5]]
splitBy([1, 2, 3, 4, 5], x => x === 5) // [[1, 2, 3, 4], []]
splitBy([1, 2, 3, 4, 5], x => x === 0) // [[1, 2, 3, 4, 5]]
```

The memory usage of this function depends on `iterable` and `predicate`.

#### take, takeAsync
```ts
function take<T>(iterable: Iterable<T>, count: number): Iterable<T>
function takeAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T>
```

```js
take([1, 2, 3], 5) // [1, 2, 3]
take([1, 2, 3], 2) // [1, 2]
take([1, 2, 3], 0) // []
take([1, 2, 3], -1) // throw Error
```

#### takeRight, takeRightAsync
```ts
function takeRight<T>(iterable: Iterable<T>, count: number): Iterable<T>
function takeRightAsync<T>(
  iterable: AsyncIterable<T>
, count: number
): AsyncIterable<T>
```

```js
takeRight([1, 2, 3], 2) // [2, 3]
takeRight([1, 2, 3], 5) // [1, 2, 3]
takeRight([1, 2, 3], 0) // []
takeRight([1, 2, 3], -1) // throw Error
```

The memory usage of this function depends on `count`.

#### takeUntil, takeUntilAsync
```ts
function takeUntil<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<T>
function takeUntilAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<T>
```

```js
takeUntil([1, 2, 3], x => x === 2) // [1]
```

#### tap, tapAsync
```ts
function tap<T>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => unknown
): Iterable<T> {
function tapAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<T>
```

```js
tap([1, 2, 3], x => console.log(x)) // [1, 2, 3]
```

#### toAsyncIterable
```ts
function toAsyncIterable<T>(iterable: Iterable<Awaitable<T>>): AsyncIterable<T>
```

```js
toAsyncIterable([1, 2, 3]) // AsyncIterable [1, 2, 3]
```

#### transform, transformAsync
```ts
function transform<T, U>(
  iterable: Iterable<T>
, transformer: (iterable: Iterable<T>) => Iterable<U>
): Iterable<U>
function transformAsync<T, U>(
  iterable: Iterable<T>
, transformer: (iterable: Iterable<T>) => AsyncIterable<U>
): AsyncIterable<U>
function transformAsync<T, U>(
  iterable: AsyncIterable<T>
, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>
): AsyncIterable<U>
```

```js
transform([1, 2, 3], function* double(iter) {
  for (const element of iter) {
    yield element * 2
  }
}) // [2, 4, 6]
```

#### uniq, uniqAsync
```ts
function uniq<T>(iterable: Iterable<T>): Iterable<T>
function uniqAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T>
```

```js
uniq([1, 1, 2, 2, 3, 3]) // [1, 2, 3]
```

The memory usage of this function depends on `iterable`.

#### uniqBy, uniqByAsync
```ts
function uniqBy<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => U
): Iterable<T> {
function uniqByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterable<T>
```

```js
uniqBy([1, 2, 3], x => x % 2) // [1, 2]
```

The memory usage of this function depends on `fn`.

#### zip, zipAsync
```ts
function zip<T, U extends Array<Iterable<unknown>>>(
  iterable: Iterable<T>
, ...otherIterables: U
): Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]> {
function zipAsync<T, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
  iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
, ...otherIterables: U
): AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]> {
```

```js
zip([1, 2, 3], ['a', 'b', 'c']) // [[1, 'a'], [2, 'b'], [3, 'c']]
zip([1, 2, 3], ['a', 'b']) // [[1, 'a'], [2, 'b']
zip([1, 2, 3], ['a', 'b'], ['i', 'ii', 'iii']) // [[1, 'a', 'i'], [2, 'b', 'ii']]
```

### Output
#### consume
```ts
function consume<T, U>(iterable: Iterable<T>, consumer: (iterable: Iterable<T>) => U): U
function consume<T, U>(
  iterable: AsyncIterable<T>
, consumer: (iterable: AsyncIterable<T>) => U
): U
```

```js
consume([1, 2, 3], xs => new Set(xs)) // Set [1, 2, 3]
```

#### each, eachAsync
```ts
function each<T>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => unknown
): void
function eachAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): Promise<void>
```

```js
each([1, 2, 3], x => console.log(x)) // void
```

#### every, everyAsync
```ts
function every<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): boolean
function everyAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean>
```

```js
every([1, 2, 3], x => x < 5) // true
every([1, 2, 3], x => x <= 2) // false
```

#### find, findAsync
```ts
function find<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): T | undefined
function findAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<T | undefined>
```

```js
find([1, 2, 3], x => x === 2) // 2
find([1, 2, 3], x => x === 4) // undefined
```

#### first, firstAsync
```ts
function first<T>(iterable: Iterable<T>): T | undefined
function firstAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined>
```

```js
first([1, 2, 3]) // 1
first([]) // undefined
```

#### includes, includesAsync
```ts
function includes<T>(iterable: Iterable<T>, value: T): boolean
function includesAsync<T>(iterable: AsyncIterable<T>, value: T): Promise<boolean>
```

```js
includes([1, 2, 3], 2) // true
includes([1, 2, 3], 4) // false
```

#### last, lastAsync
```ts
function last<T>(iterable: Iterable<T>): T | undefined
function lastAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined>
```

```js
last([1, 2, 3]) // 3
last([]) // undefined
```

#### match, matchAsync
```ts
function match<T>(iterable: Iterable<T>, sequence: ArrayLike<T>): boolean
function matchAsync<T>(
  iterable: AsyncIterable<T>
, sequence: ArrayLike<T>
): Promise<boolean>
```

```js
match([1, 2, 3], [2, 3]) // true
match([1, 2, 3], [3, 2]) // false
match([1, 2, 3], []) // true
```

#### reduce, reduceAsync
```ts
function reduce<T>(
  iterable: Iterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => T
): T
function reduce<T, U>(
  iterable: Iterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => U
, initialValue: U
): U
function reduceAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => Awaitable<T>
): Promise<T>
function reduceAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
, initialValue: U
): Promise<U>
```

```js
reduce([], (acc, cur) => acc + cur) // throw Error
reduce([1], (acc, cur) => acc + cur) // 1
reduce([1, 2, 3], (acc, cur) => acc + cur) // 6

reduce([1, 2, 3], (acc, cur, index) => {
  acc.push([cur, index])
  return acc
}) // [[1, 0], [2, 1], [3, 2]]
```

#### some, someAsync
```ts
function some<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): boolean
function someAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Promise<unknown>
): Promise<boolean>
```

```js
some([1, 2, 3], x => x === 2) // true
some([1, 2, 3], x => x === 4) // false
```

#### toArray, toArrayAsync
```ts
function toArray<T>(iterable: Iterable<T>): T[]
function toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<T[]>
```

```js
toArray([1, 2, 3]) // Array [1, 2, 3]
```

#### toSet, toSetAsync
```ts
function toSet<T>(iterable: Iterable<T>): Set<T>
function toSetAsync<T>(iterable: AsyncIterable<T>): Promise<Set<T>>
```

```js
toSet([1, 1, 2, 2, 3, 3]) // Set [1, 2, 3]
```

#### count, countAsync
```ts
function count(iterable: Iterable<unknown>): number
function countAsync(iterable: AsyncIterable<unknown>): Promise<number>
```

```js
count([1, 2, 3]) // 3
```

#### groupBy
```ts
function groupBy<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => U
): Map<U, T[]>
function groupByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): Promise<Map<U, T[]>>
```

```js
groupBy([1, 2, 3], x => x % 2) // { 1: [1, 3], 0: [2] }
```
