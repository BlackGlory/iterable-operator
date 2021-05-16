import { flattenByAsync } from './flatten-by-async'
import { assert } from '@blackglory/errors'

export function flattenDeepAsync<T>(iterable: AsyncIterable<unknown>): AsyncIterable<T>
export function flattenDeepAsync<T>(
  iterable: AsyncIterable<unknown>
, depth: number
): AsyncIterable<T>
export function flattenDeepAsync<T>(
  iterable: AsyncIterable<unknown>
, depth: number = Infinity
): AsyncIterable<T> {
  assert(
    depth === Infinity || Number.isInteger(depth)
  , 'The parameter depth must be an integer')
  assert(depth >= 0, 'The parameter depth must be greater than or equal to 0')

  return flattenByAsync(iterable, (_, level) => level <= depth)
}
