import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function slice<T>(iterable: Iterable<T>, start: number): IterableIterator<T>
export function slice<T>(
  iterable: Iterable<T>
, start: number
, end: number
): IterableIterator<T>
export function slice<T>(
  iterable: Iterable<T>
, start: number
, end: number = Infinity
): IterableIterator<T> {
  assert(Number.isInteger(start), 'The parameter start must be an integer')
  assert(start >= 0, 'The parameter start must be greater than or equal to 0')
  assert(Number.isInteger(end), 'The parameter end must be an integer')
  assert(end >= start, 'The parameter end must be greater than or equal to start')

  return go(function* () {
    let index = 0
    for (const element of iterable) {
      if (index >= end) break
      if (index >= start) yield element
      index++
    }
  })
}
