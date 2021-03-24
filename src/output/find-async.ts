import { isAsyncIterable } from '@blackglory/types'
import { RuntimeError } from '@src/error'
export { RuntimeError }

export function findAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<T> {
  if (isAsyncIterable(iterable)) {
    return findAsyncIterable(iterable)
  } else {
    return findIterable(iterable)
  }

  async function findIterable(iterable: Iterable<T>) {
    let index = 0

    for (const element of iterable) {
      if (await predicate(element, index)) return element
      index++
    }

    throw new RuntimeError('Iterable has no matched elements')
  }

  async function findAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0

    for await (const element of iterable) {
      if (await predicate(element, index)) return element
      index++
    }

    throw new RuntimeError('Iterable has no matched elements')
  }
}
