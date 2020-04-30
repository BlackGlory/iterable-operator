import { applyChaining } from '@style/utils'
import { splitBy as target } from '@middleware/split-by'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class SplitByOperator<T> extends IterableOperatorBase<T> {
  splitBy(fn: (element: T, index: number) => boolean): IterableOperator<T[]>
  splitBy(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
