import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { dropRightAsync as target } from '@body/drop-right-async'

export class DropRightAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  dropRightAsync<T>(count: number): AsyncIterableOperator<T>
  dropRightAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
