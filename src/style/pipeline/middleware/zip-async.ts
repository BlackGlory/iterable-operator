import { getPipelineProxy } from '@style/utils'
import { zipAsync as target, ExtractTypeTupleFromAsyncLikeIterableTuple } from '@middleware/zip-async'
export { ExtractTypeTupleFromAsyncLikeIterableTuple }

export function zipAsync<
  T
, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>
>(...iterables: U): (
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
) => AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
export function zipAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
