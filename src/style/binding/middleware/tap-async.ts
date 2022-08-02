import { applyBinding } from '@style/utils'
import { tapAsync as target } from '@middleware/tap-async'
import { Awaitable } from 'justypes'

export function tapAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<unknown>
): AsyncIterable<T>
export function tapAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
