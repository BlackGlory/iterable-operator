import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { includesAsync as target } from '@output/includes-async'

export class IncludesAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  includesAsync(value: T): Promise<boolean>
  includesAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
