import { applyChaining } from '@style/utils'
import { flatten as target } from '@middleware/flatten'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FlattenOperator<T> extends IterableOperatorBase<T> {
  flatten<T>(): IterableOperator<T>
  flatten(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
