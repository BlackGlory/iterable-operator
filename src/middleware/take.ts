import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function take<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')

  return go(function* () {
    if (count === 0) return
    for (const element of iterable) {
      yield element
      count--
      if (count === 0) break
    }
  })
}
