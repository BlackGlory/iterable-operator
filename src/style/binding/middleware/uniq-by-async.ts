import { applyBinding } from '@style/utils'
import { uniqByAsync as target } from '@middleware/uniq-by-async'
import { Awaitable } from 'justypes'

export function uniqByAsync<T, U>(
  this: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Awaitable<U>
): AsyncIterable<T>
export function uniqByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
