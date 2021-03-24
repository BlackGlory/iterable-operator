import { applyBinding } from '@style/utils'
import { some as target } from '@output/some'
import { IterableOperatorBase } from '../iterable-operator-base'

export class SomeOperator<T> extends IterableOperatorBase<T> {
  some(predicate: (element: T, index: number) => unknown): boolean
  some(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
