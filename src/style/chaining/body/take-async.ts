import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { takeAsync as target } from '@body/take-async'

export class TakeAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  takeAsync(count: number): AsyncIterableOperator<T>
  takeAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
