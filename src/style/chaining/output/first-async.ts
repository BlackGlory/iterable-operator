import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { firstAsync as target } from '@output/first-async'

export class FirstAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  firstAsync(): Promise<T>
  firstAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
