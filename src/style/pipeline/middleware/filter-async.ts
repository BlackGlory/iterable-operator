import { getPipelineProxy } from '@style/utils'
import { filterAsync as target } from '@middleware/filter-async'

export function filterAsync<T, U extends T = T>(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>
export function filterAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
