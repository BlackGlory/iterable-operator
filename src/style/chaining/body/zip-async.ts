import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { zipAsync as target } from '@body/zip-async'

export class ZipAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  zipAsync<T1>(
    iterable: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  ): AsyncIterableOperator<Array<T | T1>>
  zipAsync<T1, T2>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  ): AsyncIterableOperator<Array<T | T1 | T2>>
  zipAsync<T1, T2, T3>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  ): AsyncIterableOperator<Array<T | T1 | T2 | T3>>
  zipAsync<T1, T2, T3, T4>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  ): AsyncIterableOperator<Array<T | T1 | T2 | T3 | T4>>
  zipAsync<T1, T2, T3, T4, T5>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  , iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
  ): AsyncIterableOperator<Array<T | T1 | T2 | T3 | T4 | T5>>
  zipAsync<T1, T2, T3, T4, T5, T6>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  , iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
  , iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
  ): AsyncIterableOperator<Array<T | T1 | T2 | T3 | T4 | T5 | T6>>
  zipAsync<T1, T2, T3, T4, T5, T6, T7>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  , iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
  , iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
  , iterable7: Iterable<T7 | PromiseLike<T7>> | AsyncIterable<T7>
  ): AsyncIterableOperator<Array<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>>
  zipAsync<TResult>(
    ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>
  ): AsyncIterableOperator<TResult[]>
  zipAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
