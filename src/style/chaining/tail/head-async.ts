import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { headAsync as target } from '@tail/head-async'

export class HeadAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  headAsync(): Promise<T>
  headAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
