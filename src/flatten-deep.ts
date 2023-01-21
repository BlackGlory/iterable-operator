import { assert } from '@blackglory/errors'
import { flattenBy } from './flatten-by.js'

export function flattenDeep<T>(iterable: Iterable<unknown>): IterableIterator<T>
export function flattenDeep<T>(
  iterable: Iterable<unknown>
, depth: number
): IterableIterator<T>
export function flattenDeep<T>(
  iterable: Iterable<unknown>
, depth: number = Infinity
): IterableIterator<T> {
  assert(
    depth === Infinity || Number.isInteger(depth)
  , 'The parameter depth must be an integer'
  )
  assert(depth >= 0, 'The parameter depth must be greater than or equal to 0')

  return flattenBy(iterable, (_, level) => level <= depth)
}
