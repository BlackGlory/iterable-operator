import { applyBinding } from '@style/utils'
import { zipAsync as target } from '@middleware/zip-async'

export function zipAsync<T, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, ...iterables: U
): AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
export function zipAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
