import { applyBinding } from '@style/utils'
import { every as target } from '@output/every'
import { IterableOperatorBase } from '../iterable-operator-base'

export class EveryOperator<T> extends IterableOperatorBase<T> {
  every(predicate: (element: T, index: number) => unknown): boolean
  every(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
