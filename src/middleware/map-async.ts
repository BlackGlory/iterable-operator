import { isAsyncIterable } from '@blackglory/types'

export function mapAsync<T, U>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<U> {
  if (isAsyncIterable(iterable)) {
    return mapAsyncIterable(iterable)
  } else {
    return mapIterable(iterable)
  }

  async function* mapAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0
    for await (const element of iterable) {
      yield await fn(element, index)
      index++
    }
  }

  async function* mapIterable(iterable: Iterable<T>) {
    let index = 0
    for (const element of iterable) {
      yield await fn(element, index)
      index++
    }
  }
}
