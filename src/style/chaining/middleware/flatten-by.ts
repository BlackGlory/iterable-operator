import { applyChaining } from '@style/utils'
import { flattenBy as target } from '@middleware/flatten-by'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FlattenByOperator<T> extends IterableOperatorBase<T> {
  flattenBy<T>(fn: (element: unknown, level: number) => boolean): IterableOperator<T>
  flattenBy(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
