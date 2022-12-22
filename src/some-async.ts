import { isAsyncIterable } from '@src/is-async-iterable'
import { Awaitable } from 'justypes'

export function someAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean> {
  if (isAsyncIterable(iterable)) {
    return someAsyncIterable(iterable, predicate)
  } else {
    return someIterable(iterable, predicate)
  }
}

async function someIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean> {
  let index = 0

  for (const element of iterable) {
    if (await predicate(element, index)) return true
    index++
  }

  return false
}

async function someAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean> {
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) return true
    index++
  }

  return false
}
