import { applyChaining } from '@style/utils'
import { flattenBy as target } from '@middleware/flatten-by'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FlattenByOperator<T> extends IterableOperatorBase<T> {
  flattenBy<U>(fn: (element: unknown, level: number) => boolean): IterableOperator<U>
  flattenBy(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
