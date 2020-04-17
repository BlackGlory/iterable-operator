import { applyBinding } from '@style/utils'
import { first as target } from '@tail/first'
import { IterableOperatorBase } from '../iterable-operator-base'

export class FirstOperator<T> extends IterableOperatorBase<T> {
  first(): T
  first(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
