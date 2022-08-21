import { getPipelineProxy } from '@style/utils'
import { dropUntilAsync as target } from '@middleware/drop-until-async'
import { Awaitable } from 'justypes'

export function dropUntilAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function dropUntilAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
