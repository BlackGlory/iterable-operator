import { applyBinding } from '@style/utils'
import { drop as target } from '@middleware/drop'

export function drop<T>(this: Iterable<T>, count: number): IterableIterator<T>
export function drop(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
