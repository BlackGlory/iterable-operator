import { applyChaining } from '@style/utils'
import { tap as target } from '@middleware/tap'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class TapOperator<T> extends IterableOperatorBase<T> {
  tap(fn: (element: T, index: number) => unknown): IterableOperator<T>
  tap(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
