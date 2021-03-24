import { isAsyncIterable } from '@blackglory/types'

export function chunkByAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T[]> {
  if (isAsyncIterable(iterable)) {
    return chunkByAsyncIterable(iterable)
  } else {
    return chunkByIterable(iterable)
  }

  async function* chunkByAsyncIterable(iterable: AsyncIterable<T>) {
    let buffer: T[] = []
    let index = 0

    for await (const element of iterable) {
      buffer.push(element)
      if (await predicate(element, index)) {
        yield buffer
        buffer = []
      }
      index++
    }

    if (buffer.length) yield buffer
  }

  async function* chunkByIterable(iterable: Iterable<T>) {
    let buffer: T[] = []
    let index = 0

    for (const element of iterable) {
      buffer.push(element)
      if (await predicate(element, index)) {
        yield buffer
        buffer = []
      }
      index++
    }

    if (buffer.length) yield buffer
  }
}
