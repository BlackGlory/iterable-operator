import { Awaitable } from 'justypes'

export async function* mapAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterableIterator<U> {
  let index = 0
  for await (const element of iterable) {
    yield await fn(element, index)
    index++
  }
}
