import { applyBinding } from '@style/utils'
import { toSet as target } from '@tail/to-set'

export function toSet<T>(this: Iterable<T>): Set<T>
export function toSet(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
