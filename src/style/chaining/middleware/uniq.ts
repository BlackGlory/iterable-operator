import { applyChaining } from '@style/utils'
import { uniq as target } from '@middleware/uniq'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class UniqOperator<T> extends IterableOperatorBase<T> {
  uniq(): IterableOperator<T>
  uniq(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
