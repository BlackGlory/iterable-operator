import { consume } from './consume'

export function toSetAsync<T>(iterable: AsyncIterable<T>): Promise<Set<T>> {
  return consume(iterable, async iterable => {
    const result = new Set<T>()
    for await (const element of iterable) {
      result.add(element)
    }
    return result
  })
}
