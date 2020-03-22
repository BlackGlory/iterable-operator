import { applyChaining } from '@style/utils'
import { dropRight as target } from '@body/drop-right'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class DropRightOperator<T> extends IterableOperatorBase<T> {
  dropRight(count: number): IterableOperator<T>
  dropRight(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
