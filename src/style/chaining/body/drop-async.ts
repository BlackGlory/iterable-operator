import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { dropAsync as target } from '@body/drop-async'

export class DropAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  dropAsync(count: number): AsyncIterableOperator<T>
  dropAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
