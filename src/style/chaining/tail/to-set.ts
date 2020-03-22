import { applyBinding } from '@style/utils'
import { toSet as target } from '@tail/to-set'
import { IterableOperatorBase } from '../iterable-operator-base'

export class ToSetOperator<T> extends IterableOperatorBase<T> {
  toSet(): Set<T>
  toSet(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
