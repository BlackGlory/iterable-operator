import { getPipelineProxy } from '@style/utils'
import { chunkByAsync as target } from '@middleware/chunk-by-async'
import { Awaitable } from 'justypes'

export function chunkByAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T[]>
export function chunkByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
