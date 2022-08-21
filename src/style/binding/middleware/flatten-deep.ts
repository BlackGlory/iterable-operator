import { applyBinding } from '@style/utils'
import { flattenDeep as target } from '@middleware/flatten-deep'

export function flattenDeep<T>(this: Iterable<unknown>): IterableIterator<T>
export function flattenDeep<T>(
  this: Iterable<unknown>
, depth: number
): IterableIterator<T>
export function flattenDeep(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
