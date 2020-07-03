import { applyChaining } from '@style/utils'
import { takeRight as target } from '@middleware/take-right'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class TakeRightOperator<T> extends IterableOperatorBase<T> {
  takeRight(count: number): IterableOperator<T>
  takeRight(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
