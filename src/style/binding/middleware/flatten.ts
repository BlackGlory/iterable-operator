import { applyBinding } from '@style/utils'
import { flatten as target } from '@middleware/flatten'

export function flatten<T>(this: Iterable<unknown>): IterableIterator<T>
export function flatten(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
