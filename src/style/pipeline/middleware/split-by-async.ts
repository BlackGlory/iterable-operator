import { getPipelineProxy } from '@style/utils'
import { splitByAsync as target } from '@middleware/split-by-async'

export function splitByAsync<T>(
  predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]>
export function splitByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
