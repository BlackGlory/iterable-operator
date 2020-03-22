import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { tailAsync as target } from '@tail/tail-async'

export class TailAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  tailAsync(): Promise<T>
  tailAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
