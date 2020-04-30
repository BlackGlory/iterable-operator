import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { toSetAsync as target } from '@output/to-set-async'

export class ToSetAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  toSetAsync(): Promise<Set<T>>
  toSetAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
