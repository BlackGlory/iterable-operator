import { applyBinding } from '@style/utils'
import { first as target } from '@output/first'
import { IterableOperatorBase } from '../iterable-operator-base'

export class FirstOperator<T> extends IterableOperatorBase<T> {
  first(): T | undefined
  first(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
