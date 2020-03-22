import { applyBinding } from '@style/utils'
import { tail as target } from '@tail/tail'
import { IterableOperatorBase } from '../iterable-operator-base'

export class TailOperator<T> extends IterableOperatorBase<T> {
  tail(): T
  tail(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
