import { Awaitable } from 'justypes'

export async function* toAsyncIterable<T>(
  iterable: Iterable<Awaitable<T>>
): AsyncIterableIterator<T> {
  for (const value of iterable) {
    yield value
  }
}
