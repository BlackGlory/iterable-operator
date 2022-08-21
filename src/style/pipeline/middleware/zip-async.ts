import { getPipelineProxy } from '@style/utils'
import { zipAsync as target, ExtractTypeTupleFromAsyncLikeIterableTuple } from '@middleware/zip-async'
import { Awaitable } from 'justypes'
export { ExtractTypeTupleFromAsyncLikeIterableTuple }

export function zipAsync<
  T
, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>
>(...iterables: U): (
  iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
) => AsyncIterableIterator<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
export function zipAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
