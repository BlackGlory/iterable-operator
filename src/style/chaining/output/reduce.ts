import { applyBinding } from '@style/utils'
import { reduce as target } from '@output/reduce'
import { IterableOperatorBase } from '../iterable-operator-base'

export class ReduceOperator<T> extends IterableOperatorBase<T> {
  reduce(fn: (accumulator: T, currentValue: T, index: number) => T): T
  reduce<U>(fn: (accumulator: U, currentValue: T, index: number) => U, initialValue: U): U
  reduce(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
