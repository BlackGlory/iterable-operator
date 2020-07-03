import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { flattenAsync as target } from '@middleware/flatten-async'

export class FlattenAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  flattenAsync<T>(): AsyncIterableOperator<T>
  flattenAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
