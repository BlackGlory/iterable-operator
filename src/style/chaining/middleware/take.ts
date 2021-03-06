import { applyChaining } from '@style/utils'
import { take as target } from '@middleware/take'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class TakeOperator<T> extends IterableOperatorBase<T> {
  take(count: number): IterableOperator<T>
  take(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
