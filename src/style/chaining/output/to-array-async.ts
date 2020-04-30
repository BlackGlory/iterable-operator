import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { toArrayAsync as target } from '@output/to-array-async'

export class ToArrayAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  toArrayAsync(): Promise<T[]>
  toArrayAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
