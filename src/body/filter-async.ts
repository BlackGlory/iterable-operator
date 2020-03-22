import { isAsyncIterable } from '../utils'

export function filterAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return filterAsyncIterable(iterable)
  } else {
    return filterIterable(iterable)
  }

  async function* filterAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0
    for await (const element of iterable) {
      if (await fn(element, index)) yield element
      index++
    }
  }

  async function* filterIterable(iterable: Iterable<T>) {
    let index = 0
    for (const element of iterable) {
      if (await fn(element, index)) yield element
      index++
    }
  }
}
