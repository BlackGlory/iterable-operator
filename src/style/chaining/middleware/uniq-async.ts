import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { uniqAsync as target } from '@middleware/uniq-async'

export class UniqAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  uniqAsync(): AsyncIterableOperator<T>
  uniqAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
