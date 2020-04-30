import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { takeUntilAsync as target } from '@middleware/take-until-async'

export class TakeUntilAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  takeUntilAsync(fn: (element: T, index: number) => boolean | PromiseLike<T>): AsyncIterableOperator<T>
  takeUntilAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
