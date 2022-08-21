import { applyBinding } from '@style/utils'
import { take as target } from '@middleware/take'

export function take<T>(
  this: Iterable<T>
, count: number
): IterableIterator<T>
export function take(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
