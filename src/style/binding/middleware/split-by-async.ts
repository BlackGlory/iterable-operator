import { applyBinding } from '@style/utils'
import { splitByAsync as target } from '@middleware/split-by-async'

export function splitByAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
): AsyncIterable<T[]>
export function splitByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
