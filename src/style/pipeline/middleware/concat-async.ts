import { getPipelineProxy } from '@style/utils'
import { concatAsync as target } from '@middleware/concat-async'
import { Awaitable } from 'justypes'

export function concatAsync<T, U>(
  ...iterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
): (iterable: Iterable<Awaitable<T>> | AsyncIterable<T>) => AsyncIterable<T | U>
export function concatAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
