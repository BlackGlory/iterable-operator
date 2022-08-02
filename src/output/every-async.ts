import { isAsyncIterable } from '@blackglory/types'
import { Awaitable} from 'justypes'

export function everyAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean> {
  if (isAsyncIterable(iterable)) {
    return everyAsyncIterable(iterable, predicate)
  } else {
    return everyIterable(iterable, predicate)
  }
}

async function everyIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
) {
  let index = 0
  for (const element of iterable) {
    if (!await predicate(element, index)) return false
    index++
  }
  return true
}

async function everyAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
) {
  let index = 0
  for await (const element of iterable) {
    if (!await predicate(element, index)) return false
    index++
  }
  return true
}
