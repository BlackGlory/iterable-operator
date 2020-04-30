import { applyChaining } from '@style/utils'
import { flattenDeep as target } from '@middleware/flatten-deep'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FlattenDeepOperator<T> extends IterableOperatorBase<T> {
  flattenDeep<U>(): IterableOperator<U>
  flattenDeep<U>(depth: number): IterableOperator<U>
  flattenDeep(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
