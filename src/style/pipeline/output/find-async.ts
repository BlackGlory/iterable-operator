import { getPipelineProxy } from '@style/utils'
import { findAsync as target } from '@output/find-async'

export function findAsync<T>(
  predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T | undefined>
export function findAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
