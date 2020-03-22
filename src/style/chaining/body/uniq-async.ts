import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { uniqAsync as target } from '@body/uniq-async'

export class UniqAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  uniqAsync<T>(): AsyncIterableOperator<T>
  uniqAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
