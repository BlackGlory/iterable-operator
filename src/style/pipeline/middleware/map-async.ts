import { getPipelineProxy } from '@style/utils'
import { mapAsync as target } from '@middleware/map-async'

export function mapAsync<T, U>(fn: (element: T, index: number) => U | PromiseLike<U>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>
export function mapAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
