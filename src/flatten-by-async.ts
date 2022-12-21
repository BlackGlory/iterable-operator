import { isntChar } from 'extra-utils'
import { isAsyncIterable } from '@src/is-async-iterable'
import { isIterable } from '@src/is-iterable'
import { Awaitable } from 'justypes'

export function flattenByAsync<T>(
  iterable: Iterable<unknown> | AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  if (isAsyncIterable(iterable)) {
    return flattenByAsyncIterable(iterable, predicate)
  } else {
    return flattenByIterable(iterable, predicate)
  }
}

async function* flattenByAsyncIterable<T>(
  iterable: AsyncIterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  const level = 1
  for await (const element of iterable) {
    if (isFiniteIterable(element) && await predicate(element, level)) {
      yield* flatten(element, predicate, level + 1)
    } else {
      yield element as T
    }
  }
}

function flattenByIterable<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  return flatten(iterable, predicate, 1)
}

async function* flatten<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => Awaitable<unknown>
, level: number
): AsyncIterableIterator<T> {
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
