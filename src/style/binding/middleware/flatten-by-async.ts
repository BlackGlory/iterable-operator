import { applyBinding } from '@style/utils'
import { flattenByAsync as target } from '@middleware/flatten-by-async'

export function flattenByAsync<T>(this: Iterable<unknown> | AsyncIterable<unknown>, predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>): AsyncIterable<T>
export function flattenByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
