import { applyBinding } from '@style/utils'
import { some as target } from '@output/some'
import { IterableOperatorBase } from '../iterable-operator-base'

export class SomeOperator<T> extends IterableOperatorBase<T> {
  some(fn: (element: T, index: number) => boolean): boolean
  some(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
