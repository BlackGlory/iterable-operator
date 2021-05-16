import { applyBinding } from '@style/utils'
import { find as target } from '@output/find'
import { IterableOperatorBase } from '../iterable-operator-base'

export class FindOperator<T> extends IterableOperatorBase<T> {
  find(predicate: (element: T, index: number) => unknown): T | undefined
  find(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
