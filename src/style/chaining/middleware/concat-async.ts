import { applyChainingAsync } from '@style/utils'
import { concatAsync as target } from '@middleware/concat-async'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'

export class ConcatAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  concatAsync<T1>(
    iterable: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  ): AsyncIterableOperator<T | T1>
  concatAsync<T1, T2>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  ): AsyncIterableOperator<T | T1 | T2>
  concatAsync<T1, T2, T3>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  ): AsyncIterableOperator<T | T1 | T2 | T3>
  concatAsync<T1, T2, T3, T4>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  ): AsyncIterableOperator<T | T1 | T2 | T3 | T4>
  concatAsync<T1, T2, T3, T4, T5>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  , iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
  ): AsyncIterableOperator<T | T1 | T2 | T3 | T4 | T5>
  concatAsync<T1, T2, T3, T4, T5, T6>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  , iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
  , iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
  ): AsyncIterableOperator<T | T1 | T2 | T3 | T4 | T5 | T6>
  concatAsync<T1, T2, T3, T4, T5, T6, T7>(
    iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
  , iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
  , iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
  , iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
  , iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
  , iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
  , iterable7: Iterable<T7 | PromiseLike<T7>> | AsyncIterable<T7>
  ): AsyncIterableOperator<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>
  concatAsync<TResult>(
    ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>
  ): AsyncIterableOperator<TResult>
  concatAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
