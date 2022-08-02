import { isAsyncIterable, isIterable, isntChar } from '@blackglory/types'

export function flattenByAsync<T>(
  iterable: Iterable<unknown> | AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return flattenByAsyncIterable(iterable, predicate) as AsyncIterable<T>
  } else {
    return flattenByIterable(iterable, predicate) as AsyncIterable<T>
  }
}

async function* flattenByAsyncIterable(
  iterable: AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
) {
  const level = 1
  for await (const element of iterable) {
    if (isFiniteIterable(element) && await predicate(element, level)) {
      yield* flatten(element, predicate, level + 1)
    } else {
      yield element
    }
  }
}

function flattenByIterable(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
) {
  return flatten(iterable, predicate, 1)
}

async function* flatten<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
, level: number
): AsyncIterable<T> {
  for (const element of iterable) {
    if (isFiniteIterable(element) && await predicate(element, level)) {
      yield* flatten<T>(element, predicate, level + 1)
    } else {
      yield element as T
    }
  }
}

function isFiniteIterable<T>(val: unknown): val is Iterable<T> {
  return isIterable(val) && isntChar(val)
}
