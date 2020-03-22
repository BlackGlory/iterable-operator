import { getPipelineProxy } from '@style/utils'
import { eachAsync as target } from '@tail/each-async'

export function eachAsync<T>(fn: (element: T, index: number) => unknown | PromiseLike<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<void>
export function eachAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
