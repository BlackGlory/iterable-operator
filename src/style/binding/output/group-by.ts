import { applyBinding } from '@style/utils'
import { groupBy as target } from '@output/group-by'

export function groupBy<T, U>(
  this: Iterable<T>
, fn: (element: T, index: number) => U
): Map<U, T[]>
export function groupBy(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
