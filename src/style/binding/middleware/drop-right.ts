import { applyBinding } from '@style/utils'
import { dropRight as target } from '@middleware/drop-right'

export function dropRight<T>(
  this: Iterable<T>
, count: number
): IterableIterator<T>
export function dropRight(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
