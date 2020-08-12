import { isAsyncIterable } from '@blackglory/types'

export function someAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean> {
  if (isAsyncIterable(iterable)) {
    return someAsyncIterable(iterable)
  } else {
    return someIterable(iterable)
  }

  async function someIterable(iterable: Iterable<T>) {
    let index = 0
    for (const element of iterable) {
      if (await fn(element, index)) return true
      index++
    }
    return false
  }

  async function someAsyncIterable(iterable: AsyncIterable<T>) {
    let index = 0
    for await (const element of iterable) {
      if (await fn(element, index)) return true
      index++
    }
    return false
  }
}
