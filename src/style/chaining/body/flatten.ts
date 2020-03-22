import { applyChaining } from '@style/utils'
import { flatten as target } from '@body/flatten'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class FlattenOperator<T> extends IterableOperatorBase<T> {
  flatten<U>(): IterableOperator<T>
  flatten(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
