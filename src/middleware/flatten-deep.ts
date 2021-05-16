import { flattenBy } from './flatten-by'
import { assert } from '@blackglory/errors'

export function flattenDeep<T>(iterable: Iterable<unknown>): Iterable<T>
export function flattenDeep<T>(iterable: Iterable<unknown>, depth: number): Iterable<T>
export function flattenDeep<T>(iterable: Iterable<unknown>, depth: number = Infinity): Iterable<T> {
  assert(
    depth === Infinity || Number.isInteger(depth)
  , 'The parameter depth must be an integer'
  )
  assert(depth >= 0, 'The parameter depth must be greater than or equal to 0')

  return flattenBy(iterable, (_, level) => level <= depth)
}
