import { go } from  '@blackglory/go'
import { assert } from '@blackglory/errors'

export function takeRight<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')

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
