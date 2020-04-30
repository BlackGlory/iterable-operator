import { isAsyncIterable } from '../utils'

export function flattenByAsync(iterable: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): AsyncIterable<any> {
  if (isAsyncIterable(iterable)) {
    return flattenByAsyncIterable(iterable)
  } else {
    return flattenByIterable(iterable)
  }

  async function* flattenByAsyncIterable(iterable: AsyncIterable<unknown>) {
    const level = 1
    for await (const element of iterable) {
      if (isFiniteIterable(element) && await fn(element, level)) {
        yield* flatten(element, level + 1)
      } else {
        yield element
      }
    }
  }

  function flattenByIterable(iterable: Iterable<unknown>) {
    return flatten(iterable, 1)
  }

  async function* flatten<T>(iterable: Iterable<unknown>, level: number): AsyncIterable<T> {
    for (const element of iterable) {
      if (isFiniteIterable(element) && await fn(element, level)) {
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
  return typeof val[Symbol.iterator] === 'function'
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
