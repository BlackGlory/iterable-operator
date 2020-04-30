import { applyChaining } from '@style/utils'
import { transform as target } from '@middleware/transform'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class TransformOperator<T> extends IterableOperatorBase<T> {
  transform<U>(transformer: (iterable: Iterable<T>) => Iterable<U>): IterableOperator<U>
  transform(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
