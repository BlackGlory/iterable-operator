import { applyBinding } from '@style/utils'
import { dropUntilAsync as target } from '@middleware/drop-until-async'
import { Awaitable } from 'justypes'

export function dropUntilAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T>
export function dropUntilAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
