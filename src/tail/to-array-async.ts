import { consumeAsync } from './consume-async'

export function toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  return consumeAsync(iterable, async iterable => {
    const result: T[] = []
    for await (const element of iterable) {
      result.push(element)
    }
    return result
  })
}
