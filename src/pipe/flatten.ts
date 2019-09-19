type NestedIterable<T> = Iterable<T> // TypeScript 3.7.0: Iterable<NestedIterable<T>>

// pipe
export function flatten<TResult>(iterable: NestedIterable<unknown>): Iterable<TResult>
export function flatten<TResult>(iterable: NestedIterable<unknown>, depth: number): Iterable<TResult>
export function flatten<TResult>(iterable: NestedIterable<any>, depth: number = Infinity): Iterable<TResult> {
  if (depth < 0) throw new RangeError('Invalid depth value')
  return (function* () {
    for (const element of iterable) {
      if (depth > 0 && element[Symbol.iterator]) {
        yield* flatten(element, depth - 1)
      } else {
        yield element
      }
    }
  })()
}
