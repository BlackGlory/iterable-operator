import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { dropAsync as target } from '@middleware/drop-async'

export class DropAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  dropAsync(count: number): AsyncIterableOperator<T>
  dropAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
