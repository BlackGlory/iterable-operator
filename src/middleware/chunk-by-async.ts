import { isAsyncIterable } from '@blackglory/types'

export function chunkByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
): AsyncIterable<T[]> {
  if (isAsyncIterable(iterable)) {
    return chunkByAsyncIterable(iterable, predicate)
  } else {
    return chunkByIterable(iterable, predicate)
  }
}

async function* chunkByAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
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

async function* chunkByIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
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
