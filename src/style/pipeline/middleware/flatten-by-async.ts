import { getPipelineProxy } from '@style/utils'
import { flattenByAsync as target } from '@middleware/flatten-by-async'
import { Awaitable } from 'justypes'

export function flattenByAsync<T>(
  predicate: (element: unknown, level: number) => Awaitable<unknown>
): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterableIterator<T>
export function flattenByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
