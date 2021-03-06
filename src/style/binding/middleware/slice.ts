import { applyBinding } from '@style/utils'
import { slice as target } from '@middleware/slice'

export function slice<T>(this: Iterable<T>, start: number): Iterable<T>
export function slice<T>(this: Iterable<T>, start: number, end: number): Iterable<T>
export function slice(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
