import { getPipelineProxy } from '@style/utils'
import { takeUntilAsync as target } from '@middleware/take-until-async'
import { Awaitable } from 'justypes'

export function takeUntilAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function takeUntilAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
