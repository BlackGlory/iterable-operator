import { applyBinding } from '@style/utils'
import { uniqBy as target } from '@middleware/uniq-by'

export function uniqBy<T, U>(
  this: Iterable<T>
, fn: (element: T, index: number) => U
): Iterable<T>
export function uniqBy(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
