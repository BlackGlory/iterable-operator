import { getPipelineProxy } from '@style/utils'
import { filterAsync as target } from '@middleware/filter-async'

export function filterAsync<T, U extends T = T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>
export function filterAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
