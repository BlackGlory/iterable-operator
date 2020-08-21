import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { zipAsync as target, ExtractTypeTupleFromAsyncLikeIterableTuple } from '@middleware/zip-async'
export { ExtractTypeTupleFromAsyncLikeIterableTuple }

export class ZipAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  zipAsync<V extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
    ...iterables: V
  ): AsyncIterableOperator<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<V>]>
  zipAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
