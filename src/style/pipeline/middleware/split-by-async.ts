import { getPipelineProxy } from '@style/utils'
import { splitByAsync as target } from '@middleware/split-by-async'
import { Awaitable } from 'justypes'

export function splitByAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]>
export function splitByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
