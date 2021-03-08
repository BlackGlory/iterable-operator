import { go } from  '@blackglory/go'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function takeRight<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  return go(function* () {
    const iterator = iterable[Symbol.iterator]()
    const buffer: T[] = []
    let result: IteratorResult<T>
    while (result = iterator.next(), !result.done) {
      buffer.push(result.value)
      if (buffer.length > count) buffer.shift()
    }
    yield* buffer
  })
}
