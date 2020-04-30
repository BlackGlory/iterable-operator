import { applyBinding } from '@style/utils'
import { takeUntilAsync as target } from '@middleware/take-until-async'

export function takeUntilAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<T>): AsyncIterable<T>
export function takeUntilAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
