import { applyChaining } from '@style/utils'
import { takeUntil as target } from '@middleware/take-until'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class TakeUntilOperator<T> extends IterableOperatorBase<T> {
  takeUntil(fn: (element: T, index: number) => boolean): IterableOperator<T>
  takeUntil(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
