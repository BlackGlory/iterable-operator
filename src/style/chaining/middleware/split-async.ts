import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { splitAsync as target } from '@middleware/split-async'

export class SplitAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  splitAsync(separator: T): AsyncIterableOperator<T[]>
  splitAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
