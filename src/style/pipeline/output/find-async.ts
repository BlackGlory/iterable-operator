import { getPipelineProxy } from '@style/utils'
import { findAsync as target } from '@output/find-async'
import { Awaitable } from 'justypes'

export function findAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T | undefined>
export function findAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
