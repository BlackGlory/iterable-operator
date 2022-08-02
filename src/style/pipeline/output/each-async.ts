import { getPipelineProxy } from '@style/utils'
import { eachAsync as target } from '@output/each-async'
import { Awaitable } from 'justypes'

export function eachAsync<T>(
  fn: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<void>
export function eachAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
