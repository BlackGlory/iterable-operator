import { Awaitable } from 'justypes'
import { isAsyncIterable } from '@src/is-async-iterable.js'

export function splitByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T[]> {
  if (isAsyncIterable(iterable)) {
    return splitByAsyncIterable(iterable, predicate)
  } else {
    return splitByIterable(iterable, predicate)
  }
}

async function* splitByIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T[]> {
  let buffer: T[] = []
  let index = 0

  for (const element of iterable) {
    if (await predicate(element, index)) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
    index++
  }

  yield buffer
}

async function* splitByAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T[]> {
  let buffer: T[] = []
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
    index++
  }

  yield buffer
}
