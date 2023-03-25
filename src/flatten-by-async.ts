import { isntChar } from 'extra-utils'
import { Awaitable } from 'justypes'
import { isIterable } from '@src/is-iterable.js'

export async function* flattenByAsync<T>(
  iterable: Iterable<unknown> | AsyncIterable<unknown>
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
