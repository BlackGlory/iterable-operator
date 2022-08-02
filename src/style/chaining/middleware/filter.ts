import { applyChaining } from '@style/utils'
import { filter as target } from '@middleware/filter'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FilterOperator<T> extends IterableOperatorBase<T> {
  filter<U extends T = T>(
    predicate: (element: T, index: number) => unknown
  ): IterableOperator<U>
  filter(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
