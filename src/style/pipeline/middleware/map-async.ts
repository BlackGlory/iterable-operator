import { getPipelineProxy } from '@style/utils'
import { mapAsync as target } from '@middleware/map-async'
import { Awaitable } from 'justypes'

export function mapAsync<T, U>(
  fn: (element: T, index: number) => Awaitable<U>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>
export function mapAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
