import { applyChaining } from '@style/utils'
import { uniqBy as target } from '@middleware/uniq-by'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class UniqByOperator<T> extends IterableOperatorBase<T> {
  uniqBy<U>(fn: (element: T, index: number) => U): IterableOperator<T>
  uniqBy(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
