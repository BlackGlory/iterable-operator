import { Awaitable } from 'justypes'

export async function* splitByAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T[]> {
  let buffer: T[] = []
  let index = 0

  for await (const element of iterable) {
    if (await predicate(element, index)) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
    index++
  }

  yield buffer
}
