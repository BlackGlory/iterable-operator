import { getPipelineProxy } from '@style/utils'
import { tapAsync as target } from '@middleware/tap-async'
import { Awaitable } from 'justypes'

export function tapAsync<T>(
  fn: (element: T, index: number) => Awaitable<unknown>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function tapAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
