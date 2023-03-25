import { Awaitable } from 'justypes'

export async function* chunkByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T[]> {
  let buffer: T[] = []
  let index = 0

  for await (const element of iterable) {
    buffer.push(element)
    if (await predicate(element, index)) {
      yield buffer
      buffer = []
    }
    index++
  }

  if (buffer.length) yield buffer
}
