type NestedIterable<T> = Iterable<T> // TypeScript 3.7.0: Iterable<NestedIterable<T>>

function isChar(obj: unknown): boolean {
  return typeof obj === 'string' && obj.length === 1
}

function isIterable(obj: any): boolean {
  return typeof obj[Symbol.iterator] === 'function'
}

// pipe
export function flatten<TResult>(iterable: NestedIterable<unknown>): Iterable<TResult>
export function flatten<TResult>(iterable: NestedIterable<unknown>, depth: number): Iterable<TResult>
export function flatten(iterable: NestedIterable<any>, depth: number = Infinity) {
  if (depth < 0) throw new RangeError('Invalid depth value')
  return (function* () {
    for (const element of iterable) {
      if (depth > 0 && isIterable(element) && !isChar(element)) {
        yield* flatten(element, depth - 1)
      } else {
        yield element
      }
    }
  })()
}
