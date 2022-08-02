import { getPipelineProxy } from '@style/utils'
import { someAsync as target } from '@output/some-async'
import { Awaitable } from 'justypes'

export function someAsync<T>(
  predicate: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<boolean>
export function someAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
