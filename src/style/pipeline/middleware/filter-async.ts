import { getPipelineProxy } from '@style/utils'
import { filterAsync as target } from '@middleware/filter-async'
import { Awaitable } from 'justypes'

export function filterAsync<T, U extends T = T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<U>
export function filterAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
