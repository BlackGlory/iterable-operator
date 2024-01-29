import { Awaitable } from 'justypes'

export async function* chunkByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: Awaited<T>, index: number) => Awaitable<unknown>
): AsyncIterableIterator<Array<Awaited<T>>> {
  let buffer: Array<Awaited<T>> = []
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
