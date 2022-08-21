import { applyBinding } from '@style/utils'
import { chunk as target } from '@middleware/chunk'

export function chunk<T>(
  this: Iterable<T>
, size: number
): IterableIterator<T[]>
export function chunk(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
