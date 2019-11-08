type NestedIterable<T> = Iterable<NestedIterable<T> | T>

function isChar(obj: unknown): boolean {
  return typeof obj === 'string' && obj.length === 1
}

function isIterable(obj: any): obj is Iterable<unknown> {
  return typeof obj[Symbol.iterator] === 'function'
}

export function flatten<T>(iterable: NestedIterable<T>): Iterable<T>
export function flatten<T>(iterable: NestedIterable<T>, depth: number): Iterable<T>
export function flatten<T, U>(iterable: NestedIterable<T>): Iterable<U>
export function flatten<T, U>(iterable: NestedIterable<T>, depth: number): Iterable<U>
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
