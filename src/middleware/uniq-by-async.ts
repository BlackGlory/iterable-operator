import { isAsyncIterable } from '@blackglory/types'
import { Awaitable } from 'justypes'

export function uniqByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<T> {
  if (isAsyncIterable(iterable)) {
    return uniqByAsyncIterable(iterable, fn)
  } else {
    return uniqByIterable(iterable, fn)
  }
}

async function* uniqByAsyncIterable<T, U>(
  iterable: AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<T> {
  const bucket = new Set<U>()
  let index = 0
  for await (const element of iterable) {
    const result = await fn(element, index)
    if (!bucket.has(result)) {
      yield element
      bucket.add(result)
    }
    index++
  }
}

async function* uniqByIterable<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<T> {
  const bucket = new Set<U>()
  let index = 0
  for (const element of iterable) {
    const result = await fn(element, index)
    if (!bucket.has(result)) {
      yield element
      bucket.add(result)
    }
    index++
  }
}
