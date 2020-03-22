import { flattenBy } from './flatten-by'
import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function flattenDeep<T>(iterable: Iterable<unknown>): Iterable<T>
export function flattenDeep<T>(iterable: Iterable<unknown>, depth: number): Iterable<T>
export function flattenDeep<T>(iterable: Iterable<unknown>, depth: number = Infinity): Iterable<T> {
  if (depth < 0) throw new InvalidArgumentError('depth', '>= 0')

  return flattenBy(iterable, (_, level) => level <= depth)
}
