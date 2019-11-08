function isChar(obj: unknown): boolean {
  return typeof obj === 'string' && obj.length === 1
}

function isIterable(obj: any): obj is Iterable<unknown> {
  return typeof obj[Symbol.iterator] === 'function'
}

export function flattenDeep<T, U = T>(iterable: NestedIterable<T>): Iterable<U>
export function flattenDeep<T, U = T>(iterable: NestedIterable<T>, depth: number): Iterable<U>
export function flattenDeep<T, U = T>(iterable: NestedIterable<T>, depth: number, exclude: (value: Iterable<unknown>) => boolean): Iterable<U>
export function flattenDeep<T, U = T>(iterable: NestedIterable<T>, depth: number = Infinity, exclude: (value: Iterable<unknown>) => boolean = () => false) {
  if (depth < 0) throw new RangeError('Invalid depth value')
  return (function* () {
    for (const element of iterable) {
      if (depth > 0 && isIterable(element) && !isChar(element) && !exclude(element)) {
        yield* flattenDeep<T, U>(element, depth - 1)
      } else {
        yield element
      }
    }
  })()
}
