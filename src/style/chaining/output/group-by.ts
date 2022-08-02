import { applyBinding } from '@style/utils'
import { groupBy as target } from '@output/group-by'
import { IterableOperatorBase } from '../iterable-operator-base'

export class GroupByOperator<T> extends IterableOperatorBase<T> {
  groupBy<U>(fn: (element: T, index: number) => U): Map<U, T[]>
  groupBy(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
