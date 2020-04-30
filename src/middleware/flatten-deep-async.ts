import { flattenByAsync } from './flatten-by-async'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function flattenDeepAsync<T>(iterable: AsyncIterable<unknown>): AsyncIterable<T>
export function flattenDeepAsync<T>(iterable: AsyncIterable<unknown>, depth: number): AsyncIterable<T>
export function flattenDeepAsync<T>(iterable: AsyncIterable<unknown>, depth: number = Infinity): AsyncIterable<T> {
  if (depth < 0) throw new InvalidArgumentError('depth', '>= 0')

  return flattenByAsync(iterable, (_, level) => level <= depth)
}
