import { getPipelineProxy } from '@style/utils'
import { tapAsync as target } from '@middleware/tap-async'

export function tapAsync<T>(
  fn: (element: T, index: number) => unknown | PromiseLike<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function tapAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
