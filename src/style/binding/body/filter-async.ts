import { applyBinding } from '@style/utils'
import { filterAsync as target } from '@body/filter-async'

export function filterAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T>
export function filterAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
