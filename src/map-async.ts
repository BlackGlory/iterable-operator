import { isAsyncIterable } from '@blackglory/types'
import { Awaitable } from 'justypes'

export function mapAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<U> {
  if (isAsyncIterable(iterable)) {
    return mapAsyncIterable(iterable, fn)
  } else {
    return mapIterable(iterable, fn)
  }
}

async function* mapAsyncIterable<T, U>(
  iterable: AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<U> {
  let index = 0
  for await (const element of iterable) {
    yield await fn(element, index)
    index++
  }
}

async function* mapIterable<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<U> {
  let index = 0
  for (const element of iterable) {
    yield await fn(element, index)
    index++
  }
}
