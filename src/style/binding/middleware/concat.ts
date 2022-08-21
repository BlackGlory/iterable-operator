import { applyBinding } from '@style/utils'
import { concat as target } from '@middleware/concat'

export function concat<T, U>(
  this: Iterable<T>
, ...iterables: Iterable<U>[]
): IterableIterator<T | U>
export function concat(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
