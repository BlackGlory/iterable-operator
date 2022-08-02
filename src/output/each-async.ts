import { isAsyncIterable } from '@blackglory/types'

export function eachAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
): Promise<void> {
  if (isAsyncIterable(iterable)) {
    return eachAsyncIterable(iterable, fn)
  } else {
    return eachIterable(iterable, fn)
  }
}

async function eachAsyncIterable<T>(
  iterable: AsyncIterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
  let index = 0

  for await (const element of iterable) {
    await fn(element, index)
    index++
  }
}

async function eachIterable<T>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
  let index = 0

  for (const element of iterable) {
    await fn(element, index)
    index++
  }
}
