import { applyBinding } from '@style/utils'
import { dropUntilAsync as target } from '@middleware/drop-until-async'

export function dropUntilAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
): AsyncIterable<T>
export function dropUntilAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
