import { applyBinding } from '@style/utils'
import {
  zipAsync as target
, ExtractTypeTupleFromAsyncLikeIterableTuple
} from '@middleware/zip-async'
export { ExtractTypeTupleFromAsyncLikeIterableTuple }
import { Awaitable } from 'justypes'

export function zipAsync<
  T
, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>
>(
  this: Iterable<Awaitable<T>> | AsyncIterable<T>
, ...iterables: U
): AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
export function zipAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
