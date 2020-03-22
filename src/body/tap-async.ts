import { isAsyncIterable } from '../utils'

export function tapAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return tapAsyncIterable(iterable)
  } else {
    return tapIterable(iterable)
  }

  async function* tapIterable(iterable: Iterable<T>) {
    let index = 0
    for (const element of iterable) {
      await fn(element, index)
      yield element
      index++
    }
  }

  async function* tapAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0
    for await (const element of iterable) {
      await fn(element, index)
      yield element
      index++
    }
  }
}
