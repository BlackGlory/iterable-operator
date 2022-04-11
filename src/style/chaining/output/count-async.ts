import { applyBinding } from '@style/utils'
import { countAsync as target } from '@output/count-async'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'

export class CountAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  countAsync(): Promise<number>
  countAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
