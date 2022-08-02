import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { takeUntilAsync as target } from '@middleware/take-until-async'
import { Awaitable } from 'justypes'

export class TakeUntilAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  takeUntilAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterableOperator<T>
  takeUntilAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
