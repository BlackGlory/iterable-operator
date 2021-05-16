import { go } from '@blackglory/go'
import { copyIterable } from '../utils'
import { assert } from '@blackglory/errors'

export function drop<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')
  if (count === 0) return copyIterable(iterable)

  return go(function* () {
    const iterator = iterable[Symbol.iterator]()
    let result: IteratorResult<T>
    while (result = iterator.next(), !result.done) {
      if (count <= 0) break
      count--
    }
    while (!result.done) {
      yield result.value
      result = iterator.next()
    }
  })
}
