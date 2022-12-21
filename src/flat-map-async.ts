import { isAsyncIterable } from '@src/is-async-iterable'

export function flatMapAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Iterable<U> | AsyncIterable<U>
): AsyncIterableIterator<U> {
  if (isAsyncIterable(iterable)) {
    return mapAsyncIterable(iterable, fn)
  } else {
    return mapIterable(iterable, fn)
  }
}

async function* mapAsyncIterable<T, U>(
  iterable: AsyncIterable<T>
, fn: (element: T, index: number) => Iterable<U> | AsyncIterable<U>
): AsyncIterableIterator<U> {
  let index = 0
  for await (const element of iterable) {
    yield* fn(element, index)
    index++
  }
}

async function* mapIterable<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => Iterable<U> | AsyncIterable<U>
): AsyncIterableIterator<U> {
  let index = 0
  for (const element of iterable) {
    yield* fn(element, index)
    index++
  }
}
