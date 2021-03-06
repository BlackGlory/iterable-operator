import { isAsyncIterable } from '@blackglory/types'

export function takeUntilAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return takeUntilAsyncIterable(iterable)
  } else {
    return takeUntilIterable(iterable)
  }

  async function* takeUntilAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0

    for await (const element of iterable) {
      if (await predicate(element, index)) break
      yield element
      index++
    }
  }

  async function* takeUntilIterable(iterable: Iterable<T>) {
    let index = 0

    for (const element of iterable) {
      if (await predicate(element, index)) break
      yield element
      index++
    }
  }
}
