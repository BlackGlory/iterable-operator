import { applyChaining } from '@style/utils'
import { split as target } from '@middleware/split'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class SplitOperator<T> extends IterableOperatorBase<T> {
  split(separator: T): IterableOperator<T[]>
  split(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
