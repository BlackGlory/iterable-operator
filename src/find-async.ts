import { isAsyncIterable } from '@src/is-async-iterable'
import { Awaitable } from 'justypes'

export function findAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<T | undefined> {
  if (isAsyncIterable(iterable)) {
    return findAsyncIterable(iterable, predicate)
  } else {
    return findIterable(iterable, predicate)
  }
}

async function findIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<T | undefined> {
  let index = 0

  for (const element of iterable) {
    if (await predicate(element, index)) return element
    index++
  }

  return undefined
}

async function findAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<T | undefined> {
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) return element
    index++
  }

  return undefined
}
