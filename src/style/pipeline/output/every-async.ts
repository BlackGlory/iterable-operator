import { getPipelineProxy } from '@style/utils'
import { everyAsync as target } from '@output/every-async'
import { Awaitable } from 'justypes'

export function everyAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<boolean>
export function everyAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
