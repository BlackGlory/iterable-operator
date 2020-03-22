import { isAsyncIterable } from '../utils'

export function splitByAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]> {
  if (isAsyncIterable(iterable)) {
    return splitByAsyncIterable(iterable)
  } else {
    return splitByIterable(iterable)
  }

  async function* splitByIterable(iterable: Iterable<T>) {
    let buffer: T[] = []
      , index = 0
    for (const element of iterable) {
      if (await fn(element, index)) {
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
      , index = 0
    for await (const element of iterable) {
      if (await fn(element, index)) {
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
