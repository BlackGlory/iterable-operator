import { applyChaining } from '@style/utils'
import { flattenDeep as target } from '@middleware/flatten-deep'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FlattenDeepOperator<T> extends IterableOperatorBase<T> {
  flattenDeep<T>(): IterableOperator<T>
  flattenDeep<T>(depth: number): IterableOperator<T>
  flattenDeep(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
