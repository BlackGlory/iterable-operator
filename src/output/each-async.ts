import { isAsyncIterable } from '@blackglory/types'

export function eachAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void> {
  if (isAsyncIterable(iterable)) {
    return eachAsyncIterable(iterable)
  } else {
    return eachIterable(iterable)
  }

  async function eachAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0

    for await (const element of iterable) {
      await fn(element, index)
      index++
    }
  }

  async function eachIterable(iterable: Iterable<T>) {
    let index = 0

    for (const element of iterable) {
      await fn(element, index)
      index++
    }
  }
}
