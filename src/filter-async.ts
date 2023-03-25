import { Awaitable } from 'justypes'

export async function* filterAsync<T, U extends T = T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<U> {
  let index = 0
  for await (const element of iterable) {
    if (await predicate(element, index)) yield element as unknown as U
    index++
  }
}
