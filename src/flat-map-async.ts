import { Awaitable } from 'justypes'

export async function* flatMapAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: Awaited<T>, index: number) => Awaitable<Iterable<U> | AsyncIterable<U>>
): AsyncIterableIterator<Awaited<U>> {
  let index = 0
  for await (const element of iterable) {
    yield* await fn(element, index)
    index++
  }
}
