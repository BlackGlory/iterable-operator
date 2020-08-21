import { applyBinding } from '@style/utils'
import { concatAsync as target } from '@middleware/concat-async'

export function concatAsync<T, U>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, ...iterables: Array<Iterable<U | PromiseLike<U>> | AsyncIterable<U>>
): AsyncIterable<T | U>
export function concatAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
