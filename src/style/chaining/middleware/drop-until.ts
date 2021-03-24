import { applyChaining } from '@style/utils'
import { dropUntil as target } from '@middleware/drop-until'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class DropUntilOperator<T> extends IterableOperatorBase<T> {
  dropUntil(predicate: (element: T, index: number) => unknown): IterableOperator<T>
  dropUntil(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
