import { applyChainingAsync } from '@style/utils'
import { concatAsync as target } from '@middleware/concat-async'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { Awaitable } from 'justypes'

export class ConcatAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  concatAsync<V>(
    ...iterables: Array<Iterable<Awaitable<V>> | AsyncIterable<V>>
  ): AsyncIterableOperator<T | V>
  concatAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
