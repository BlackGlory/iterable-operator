import { getPipelineProxy } from '@style/utils'
import { someAsync as target } from '@output/some-async'

export function someAsync<T>(
  predicate: (element: T, index: number) => unknown | Promise<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => PromiseLike<boolean>
export function someAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
