import { applyBinding } from '@style/utils'
import { takeUntilAsync as target } from '@middleware/take-until-async'
import { Awaitable } from 'justypes'

export function takeUntilAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<T>
export function takeUntilAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
