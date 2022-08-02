import { applyBinding } from '@style/utils'
import { flattenBy as target } from '@middleware/flatten-by'

export function flattenBy<T>(
  this: Iterable<unknown>
, predicate: (element: unknown, level: number) => unknown
): Iterable<T>
export function flattenBy(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
