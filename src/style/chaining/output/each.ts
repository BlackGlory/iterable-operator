import { applyBinding } from '@style/utils'
import { each as target } from '@output/each'
import { IterableOperatorBase } from '../iterable-operator-base'

export class EachOperator<T> extends IterableOperatorBase<T> {
  each(fn: (element: T, index: number) => unknown): void
  each(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
