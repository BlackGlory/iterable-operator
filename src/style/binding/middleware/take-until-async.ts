import { applyBinding } from '@style/utils'
import { takeUntilAsync as target } from '@middleware/take-until-async'

export function takeUntilAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T>
export function takeUntilAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
