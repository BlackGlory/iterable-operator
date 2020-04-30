import { applyChaining } from '@style/utils'
import { map as target } from '@middleware/map'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class MapOperator<T> extends IterableOperatorBase<T> {
  map<U>(fn: (element: T, index: number) => U): IterableOperator<U>
  map(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
