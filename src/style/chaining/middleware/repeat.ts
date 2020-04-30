import { applyChaining } from '@style/utils'
import { repeat as target } from '@middleware/repeat'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class RepeatOperator<T> extends IterableOperatorBase<T> {
  repeat(times: number): IterableOperator<T>
  repeat(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
