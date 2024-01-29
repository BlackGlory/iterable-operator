import { Awaitable } from 'justypes'

export async function findAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: Awaited<T>, index: number) => Awaitable<unknown>
): Promise<Awaited<T> | undefined> {
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) return element
    index++
  }

  return undefined
}
