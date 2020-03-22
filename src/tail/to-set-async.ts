import { consumeAsync } from './consume-async'

export function toSetAsync<T>(iterable: AsyncIterable<T>): Promise<Set<T>> {
  return consumeAsync(iterable, async iterable => {
    const result = new Set<T>()
    for await (const element of iterable) {
      result.add(element)
    }
    return result
  })
}
