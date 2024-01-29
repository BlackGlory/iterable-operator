import { Awaitable } from 'justypes'

export async function* toAsyncIterable<T>(
  iterable: Iterable<Awaitable<T>>
): AsyncIterableIterator<Awaited<T>> {
  for (const value of iterable) {
    yield value
  }
}
