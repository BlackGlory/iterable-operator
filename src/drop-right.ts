import { go } from '@blackglory/go'
import { copyIterable } from './utils'
import { assert } from '@blackglory/errors'

export function dropRight<T>(
  iterable: Iterable<T>
, count: number
): IterableIterator<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')

  if (count === 0) return copyIterable(iterable)
  return go(function* () {
    const arr = Array.from(iterable)
    yield* arr.slice(0, -count)
  })
}
