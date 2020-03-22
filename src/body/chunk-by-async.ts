import { isAsyncIterable } from '../utils'

export function chunkByAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | Promise<boolean>): AsyncIterable<T[]> {
  if (isAsyncIterable(iterable)) {
    return chunkByAsyncIterable(iterable)
  } else {
    return chunkByIterable(iterable)
  }

  async function* chunkByAsyncIterable(iterable: AsyncIterable<T>) {
    let buffer: T[] = []
      , index = 0
    for await (const element of iterable) {
      buffer.push(element)
      if (await fn(element, index)) {
        yield buffer
        buffer = []
      }
      index++
    }
    yield buffer
  }

  async function* chunkByIterable(iterable: Iterable<T>) {
    let buffer: T[] = []
      , index = 0
    for (const element of iterable) {
      buffer.push(element)
      if (await fn(element, index)) {
        yield buffer
        buffer = []
      }
      index++
    }
    yield buffer
  }
}
