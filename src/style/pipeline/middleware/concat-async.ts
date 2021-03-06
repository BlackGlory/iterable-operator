import { getPipelineProxy } from '@style/utils'
import { concatAsync as target } from '@middleware/concat-async'

export function concatAsync<T, U>(
  ...iterables: Array<Iterable<U | PromiseLike<U>> | AsyncIterable<U>>
): (iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T>) => AsyncIterable<T | U>
export function concatAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
