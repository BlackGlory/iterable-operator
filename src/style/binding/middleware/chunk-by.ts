import { applyBinding } from '@style/utils'
import { chunkBy as target } from '@middleware/chunk-by'

export function chunkBy<T>(
  this: Iterable<T>
, predicate: (element: T, index: number) => unknown
): IterableIterator<T[]>
export function chunkBy(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
