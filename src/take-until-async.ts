import { Awaitable } from 'justypes'

export async function* takeUntilAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: Awaited<T>, index: number) => Awaitable<unknown>
): AsyncIterableIterator<Awaited<T>> {
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) break
    yield element
    index++
  }
}
