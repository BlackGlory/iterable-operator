import { getPipelineProxy } from '@style/utils'
import { filterAsync as target } from '@body/filter-async'

export function filterAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function filterAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
