import { InvalidArgumentError } from '@error'
import { copyAsyncIterable } from '../utils'
export { InvalidArgumentError }

export function dropRightAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  if (count === 0) return copyAsyncIterable(iterable)
  return (async function* () {
    const arr = await toArrayAsync(iterable)
    const result = arr.slice(0, -count)
    for (const value of result) {
      yield value
    }
  })()
}

async function toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const result = []
  for await (const element of iterable) {
    result.push(element)
  }
  return result
}
