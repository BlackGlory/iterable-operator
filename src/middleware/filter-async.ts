import { isAsyncIterable } from '@blackglory/types'
import { Awaitable } from 'justypes'

export function filterAsync<T, U extends T = T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<U> {
  if (isAsyncIterable(iterable)) {
    return filterAsyncIterable(iterable, predicate)
  } else {
    return filterIterable(iterable, predicate)
  }
}

async function* filterAsyncIterable<T, U>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
) {
  let index = 0
  for await (const element of iterable) {
    if (await predicate(element, index)) yield element as unknown as U
    index++
  }
}

async function* filterIterable<T, U>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
) {
  let index = 0
  for (const element of iterable) {
    if (await predicate(element, index)) yield element as unknown as U
    index++
  }
}
