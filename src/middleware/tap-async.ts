import { isAsyncIterable } from '@blackglory/types'
import { Awaitable } from 'justypes'

export function tapAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  if (isAsyncIterable(iterable)) {
    return tapAsyncIterable(iterable, fn)
  } else {
    return tapIterable(iterable, fn)
  }
}

async function* tapIterable<T>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  let index = 0
  for (const element of iterable) {
    await fn(element, index)
    yield element
    index++
  }
}

async function* tapAsyncIterable<T>(
  iterable: AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  let index = 0
  for await (const element of iterable) {
    await fn(element, index)
    yield element
    index++
  }
}
