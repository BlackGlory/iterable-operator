import { Awaitable } from 'justypes'

export async function eachAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): Promise<void> {
  let index = 0

  for await (const element of iterable) {
    await fn(element, index)
    index++
  }

}
