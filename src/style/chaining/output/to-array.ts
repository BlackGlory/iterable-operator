import { applyBinding } from '@style/utils'
import { toArray as target } from '@output/to-array'
import { IterableOperatorBase } from '../iterable-operator-base'

export class ToArrayOperator<T> extends IterableOperatorBase<T> {
  toArray(): T[]
  toArray(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
