import { isAsyncIterable } from '@blackglory/types'
import { Awaitable } from 'justypes'

export function takeUntilAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  if (isAsyncIterable(iterable)) {
    return takeUntilAsyncIterable(iterable, predicate)
  } else {
    return takeUntilIterable(iterable, predicate)
  }
}

async function* takeUntilAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) break
    yield element
    index++
  }
}

async function* takeUntilIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  let index = 0

  for (const element of iterable) {
    if (await predicate(element, index)) break
    yield element
    index++
  }
}
