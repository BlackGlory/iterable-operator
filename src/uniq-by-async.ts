import { Awaitable } from 'justypes'

export async function* uniqByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: Awaited<T>, index: number) => Awaitable<U>
): AsyncIterableIterator<Awaited<T>> {
  const bucket = new Set<U>()
  let index = 0
  for await (const element of iterable) {
    const result = await fn(element, index)
    if (!bucket.has(result)) {
      yield element
      bucket.add(result)
    }
    index++
  }
}
