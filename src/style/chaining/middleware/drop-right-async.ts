import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { dropRightAsync as target } from '@middleware/drop-right-async'

export class DropRightAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  dropRightAsync(count: number): AsyncIterableOperator<T>
  dropRightAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
