import { applyBinding } from '@style/utils'
import { split as target } from '@middleware/split'

export function split<T>(this: Iterable<T>, separator: T): Iterable<T[]>
export function split(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
