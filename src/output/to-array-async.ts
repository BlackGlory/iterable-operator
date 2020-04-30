import { consume } from './consume'

export function toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  return consume(iterable, async iterable => {
    const result: T[] = []
    for await (const element of iterable) {
      result.push(element)
    }
    return result
  })
}
