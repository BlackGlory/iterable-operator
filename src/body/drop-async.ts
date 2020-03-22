import { copyAsyncIterable } from '../utils'
import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function dropAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  if (count === 0) return copyAsyncIterable(iterable)
  return (async function* () {
    const iterator = iterable[Symbol.asyncIterator]()
    let result: IteratorResult<T>
    while (result = await iterator.next(), !result.done) {
      if (count <= 0) break
      count--
    }
    while (!result.done) {
      yield result.value
      result = await iterator.next()
    }
  })()
}
