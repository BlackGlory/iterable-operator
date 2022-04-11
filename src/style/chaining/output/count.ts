import { applyBinding } from '@style/utils'
import { count as target } from '@output/count'
import { IterableOperatorBase } from '../iterable-operator-base'

export class CountOperator<T> extends IterableOperatorBase<T> {
  count(): number
  count(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
