import { applyBinding } from '@style/utils'
import { splitByAsync as target } from '@middleware/split-by-async'
import { Awaitable } from 'justypes'

export function splitByAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): AsyncIterableIterator<T[]>
export function splitByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
