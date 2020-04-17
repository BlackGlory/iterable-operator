import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { lastAsync as target } from '@tail/last-async'

export class LastAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  lastAsync(): Promise<T>
  lastAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
