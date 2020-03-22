import { getPipelineProxy } from '@style/utils'
import { takeUntilAsync as target } from '@body/take-until-async'

export function takeUntilAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<T>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function takeUntilAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
