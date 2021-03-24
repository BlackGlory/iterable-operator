import { applyBinding } from '@style/utils'
import { filterAsync as target } from '@middleware/filter-async'

export function filterAsync<T, U extends T = T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<U>
export function filterAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
