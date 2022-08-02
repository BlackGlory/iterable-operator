import { isAsyncIterable } from '@blackglory/types'

export function tapAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return tapAsyncIterable(iterable, fn)
  } else {
    return tapIterable(iterable, fn)
  }
}

async function* tapIterable<T>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
  let index = 0
  for (const element of iterable) {
    await fn(element, index)
    yield element
    index++
  }
}

async function* tapAsyncIterable<T>(
  iterable: AsyncIterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
  let index = 0
  for await (const element of iterable) {
    await fn(element, index)
    yield element
    index++
  }
}
