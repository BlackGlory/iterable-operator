import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { takeRightAsync as target } from '@middleware/take-right-async'

export class TakeRightAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  takeRightAsync(count: number): AsyncIterableOperator<T>
  takeRightAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
