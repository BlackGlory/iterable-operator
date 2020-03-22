import { applyBinding } from '@style/utils'
import { every as target } from '@tail/every'
import { IterableOperatorBase } from '../iterable-operator-base'

export class EveryOperator<T> extends IterableOperatorBase<T> {
  every(fn: (element: T, index: number) => boolean): boolean
  every(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
