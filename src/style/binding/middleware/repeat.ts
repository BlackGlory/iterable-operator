import { applyBinding } from '@style/utils'
import { repeat as target } from '@middleware/repeat'

export function repeat<T>(this: Iterable<T>, times: number): Iterable<T>
export function repeat(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
