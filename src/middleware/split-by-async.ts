import { isAsyncIterable } from '@blackglory/types'

export function splitByAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T[]> {
  if (isAsyncIterable(iterable)) {
    return splitByAsyncIterable(iterable)
  } else {
    return splitByIterable(iterable)
  }

  async function* splitByIterable(iterable: Iterable<T>) {
    let buffer: T[] = []
    let index = 0

    for (const element of iterable) {
      if (await predicate(element, index)) {
        yield buffer
        buffer = []
      } else {
        buffer.push(element)
      }
      index++
    }

    yield buffer
  }

  async function* splitByAsyncIterable(iterable: AsyncIterable<T>) {
    let buffer: T[] = []
    let index = 0

    for await (const element of iterable) {
      if (await predicate(element, index)) {
        yield buffer
        buffer = []
      } else {
        buffer.push(element)
      }
      index++
    }

    yield buffer
  }
}
