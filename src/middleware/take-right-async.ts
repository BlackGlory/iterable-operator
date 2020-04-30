import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function takeRightAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  return (async function* () {
    const iterator = iterable[Symbol.asyncIterator]()
    const buffer: T[] = []
    let result: IteratorResult<T>
    while (result = await iterator.next(), !result.done) {
      buffer.push(result.value)
      if (buffer.length > count) buffer.shift()
    }
    yield* buffer
  })()
}
