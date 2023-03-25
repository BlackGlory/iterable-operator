import { Awaitable } from 'justypes'

export async function* tapAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T> {
  let index = 0
  for await (const element of iterable) {
    await fn(element, index)
    yield element
    index++
  }
}
