import { isAsyncIterable, isIterable, isntChar } from '@blackglory/types'

export function flattenByAsync<T>(iterable: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return flattenByAsyncIterable(iterable) as AsyncIterable<T>
  } else {
    return flattenByIterable(iterable) as AsyncIterable<T>
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
