import { applyBinding } from '@style/utils'
import { consume as target } from '@tail/consume'
import { IterableOperatorBase } from '../iterable-operator-base'

export class ConsumeOperator<T> extends IterableOperatorBase<T> {
  consume<U>(consumer: (iterable: Iterable<T>) => U): U
  consume(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
