import { applyChaining } from '@style/utils'
import { slice as target } from '@middleware/slice'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class SliceOperator<T> extends IterableOperatorBase<T> {
  slice(start: number): IterableOperator<T>
  slice(start: number, end: number): IterableOperator<T>
  slice(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
