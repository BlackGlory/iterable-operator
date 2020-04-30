import { applyChainingAsync } from '@style/utils'
import { IterableOperatorBase } from '../iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { toAsyncIterable as target } from '@middleware/to-async-iterable'

export class ToAsyncIterableOperator<T> extends IterableOperatorBase<T> {
  toAsyncIterable(): AsyncIterableOperator<T>
  toAsyncIterable(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
