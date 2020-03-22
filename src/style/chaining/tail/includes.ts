import { applyBinding } from '@style/utils'
import { includes as target } from '@tail/includes'
import { IterableOperatorBase } from '../iterable-operator-base'

export class IncludesOperator<T> extends IterableOperatorBase<T> {
  includes(value: T): boolean
  includes(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
