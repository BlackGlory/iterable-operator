import { applyBinding } from '@style/utils'
import { dropUntil as target } from '@middleware/drop-until'

export function dropUntil<T>(
  this: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<T>
export function dropUntil(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
