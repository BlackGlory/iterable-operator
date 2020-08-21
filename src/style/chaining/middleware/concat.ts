import { applyChaining } from '@style/utils'
import { concat as target } from '@middleware/concat'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class ConcatOperator<T> extends IterableOperatorBase<T> {
  concat<U>(...iterables: Iterable<U>[]): IterableOperator<T | U>
  concat(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
