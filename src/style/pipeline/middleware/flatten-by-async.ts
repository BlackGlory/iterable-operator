import { getPipelineProxy } from '@style/utils'
import { flattenByAsync as target } from '@middleware/flatten-by-async'

export function flattenByAsync<T>(
  predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterable<T>
export function flattenByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
