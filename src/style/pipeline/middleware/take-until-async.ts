import { getPipelineProxy } from '@style/utils'
import { takeUntilAsync as target } from '@middleware/take-until-async'

export function takeUntilAsync<T>(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function takeUntilAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
