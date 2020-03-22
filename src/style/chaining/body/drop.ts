import { applyChaining } from '@style/utils'
import { drop as target } from '@body/drop'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class DropOperator<T> extends IterableOperatorBase<T> {
  drop(this: Iterable<T>, count: number): IterableOperator<T>
  drop(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
