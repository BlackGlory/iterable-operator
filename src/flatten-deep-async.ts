import { assert } from '@blackglory/errors'
import { flattenByAsync } from './flatten-by-async.js'

export function flattenDeepAsync<T>(
  iterable: AsyncIterable<unknown>
): AsyncIterableIterator<T>
export function flattenDeepAsync<T>(
  iterable: AsyncIterable<unknown>
, depth: number
): AsyncIterableIterator<T>
export function flattenDeepAsync<T>(
  iterable: AsyncIterable<unknown>
, depth: number = Infinity
): AsyncIterableIterator<T> {
  assert(
    depth === Infinity || Number.isInteger(depth)
  , 'The parameter depth must be an integer')
  assert(depth >= 0, 'The parameter depth must be greater than or equal to 0')

  return flattenByAsync(iterable, (_, level) => level <= depth)
}
