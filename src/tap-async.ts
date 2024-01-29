import { Awaitable } from 'justypes'

export async function* tapAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: Awaited<T>, index: number) => Awaitable<unknown>
): AsyncIterableIterator<Awaited<T>> {
  let index = 0
  for await (const element of iterable) {
    await fn(element, index)
    yield element
    index++
  }
}
