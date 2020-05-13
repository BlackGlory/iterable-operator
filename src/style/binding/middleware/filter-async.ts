import { applyBinding } from '@style/utils'
import { filterAsync as target } from '@middleware/filter-async'

export function filterAsync<T, U extends T = T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<U>
export function filterAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}