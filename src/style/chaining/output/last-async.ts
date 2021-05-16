import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { lastAsync as target } from '@output/last-async'

export class LastAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  lastAsync(): Promise<T | undefined>
  lastAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
