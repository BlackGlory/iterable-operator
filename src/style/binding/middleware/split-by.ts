import { applyBinding } from '@style/utils'
import { splitBy as target } from '@middleware/split-by'

export function splitBy<T>(
  this: Iterable<T>
, fn: (element: T, index: number) => unknown
): Iterable<T[]>
export function splitBy(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
