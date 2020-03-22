import { isAsyncIterable } from '../utils'
import { RuntimeError } from '@error'
export { RuntimeError }

export function findAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<T> {
  if (isAsyncIterable(iterable)) {
    return findAsyncIterable(iterable)
  } else {
    return findIterable(iterable)
  }

  async function findIterable(iterable: Iterable<T>) {
    let index = 0
    for (const element of iterable) {
      if (await fn(element, index)) return element
      index++
    }
    throw new RuntimeError('Iterable has no matched elements')
  }

  async function findAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0
    for await (const element of iterable) {
      if (await fn(element, index)) return element
      index++
    }
    throw new RuntimeError('Iterable has no matched elements')
  }
}
