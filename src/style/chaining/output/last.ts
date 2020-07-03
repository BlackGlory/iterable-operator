import { applyBinding } from '@style/utils'
import { last as target } from '@output/last'
import { IterableOperatorBase } from '../iterable-operator-base'

export class LastOperator<T> extends IterableOperatorBase<T> {
  last(): T
  last(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
