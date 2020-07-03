import { applyBinding } from '@style/utils'
import { includes as target } from '@output/includes'
import { IterableOperatorBase } from '../iterable-operator-base'

export class IncludesOperator<T> extends IterableOperatorBase<T> {
  includes(value: T): boolean
  includes(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
