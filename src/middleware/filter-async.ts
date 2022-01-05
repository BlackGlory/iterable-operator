import { isAsyncIterable } from '@blackglory/types'

export function filterAsync<T, U extends T = T>(iterable: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<U> {
  if (isAsyncIterable(iterable)) {
    return filterAsyncIterable(iterable)
  } else {
    return filterIterable(iterable)
  }

  async function* filterAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0
    for await (const element of iterable) {
      if (await predicate(element, index)) yield element as unknown as U
      index++
    }
  }

  async function* filterIterable(iterable: Iterable<T>) {
    let index = 0
    for (const element of iterable) {
      if (await predicate(element, index)) yield element as U
      index++
    }
  }
}
