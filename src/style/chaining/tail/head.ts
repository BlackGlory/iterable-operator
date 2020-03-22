import { applyBinding } from '@style/utils'
import { head as target } from '@tail/head'
import { IterableOperatorBase } from '../iterable-operator-base'

export class HeadOperator<T> extends IterableOperatorBase<T> {
  head(): T
  head(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
