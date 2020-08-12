export function flattenBy<T>(iterable: Iterable<unknown>, fn: (element: unknown, level: number) => boolean): Iterable<T> {
  return flatten(iterable, 1)

  function* flatten<T>(iterable: Iterable<unknown>, level: number): Iterable<T> {
    for (const element of iterable) {
      if (isFiniteIterable(element) && fn(element, level)) {
        yield* flatten<T>(element, level + 1)
      } else {
        yield element as T
      }
    }
  }
}

function isFiniteIterable<T>(val: unknown): val is Iterable<T> {
  return isIterable(val) && isntChar(val)
}

function isIterable<T>(val: any): val is Iterable<T> {
  return isntNull(val) && isntUndefined(val) && typeof val[Symbol.iterator] === 'function'
}

function isntNull(val: unknown): boolean {
  return val !== null
}

function isntUndefined(val: unknown): boolean {
  return val !== undefined
}

type Char = (string | String) & { length: 1}

function isStringObject(val: unknown): val is String {
  return typeof val === 'object' && val instanceof String
}

function isString(val: unknown): val is string {
  return typeof val === 'string'
}

function isChar(val: unknown): val is Char {
  return (isString(val) || isStringObject(val)) && val.length === 1
}

function isntChar(val: unknown): boolean {
  return !isChar(val)
}
