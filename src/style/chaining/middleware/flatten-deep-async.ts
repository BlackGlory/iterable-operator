import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { flattenDeepAsync as target } from '@middleware/flatten-deep-async'

export class FlattenDeepAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  flattenDeepAsync<T>(): AsyncIterableOperator<T>
  flattenDeepAsync<T>(depth: number): AsyncIterableOperator<T>
  flattenDeepAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
