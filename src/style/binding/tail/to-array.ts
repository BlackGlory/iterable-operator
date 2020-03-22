import { applyBinding } from '@style/utils'
import { toArray as target } from '@tail/to-array'

export function toArray<T>(this: Iterable<T>): T[]
export function toArray(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
