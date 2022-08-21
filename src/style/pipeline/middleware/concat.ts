import { getPipelineProxy } from '@style/utils'
import { concat as target } from '@middleware/concat'

export function concat<T, U>(
  ...iterables: Array<Iterable<U>>
): (iterable: Iterable<T>) => IterableIterator<T | U>
export function concat(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
