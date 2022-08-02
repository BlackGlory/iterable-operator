import { isAsyncIterable, isIterable, isntChar } from '@blackglory/types'
import { Awaitable } from 'justypes'

export function flattenByAsync<T>(
  iterable: Iterable<unknown> | AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return flattenByAsyncIterable(iterable, predicate) as AsyncIterable<T>
  } else {
    return flattenByIterable(iterable, predicate) as AsyncIterable<T>
  }
}

async function* flattenByAsyncIterable(
  iterable: AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
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
, predicate: (element: unknown, level: number) => Awaitable<unknown>
) {
  return flatten(iterable, predicate, 1)
}

async function* flatten<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
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
