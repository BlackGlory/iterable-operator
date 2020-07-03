import { applyChaining } from '@style/utils'
import { drop as target } from '@middleware/drop'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class DropOperator<T> extends IterableOperatorBase<T> {
  drop(count: number): IterableOperator<T>
  drop(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
