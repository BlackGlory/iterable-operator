import { getPipelineProxy } from '@style/utils'
import { findAsync as target } from '@output/find-async'

export function findAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T>
export function findAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
