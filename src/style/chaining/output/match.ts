import { applyBinding } from '@style/utils'
import { match as target } from '@output/match'
import { IterableOperatorBase } from '../iterable-operator-base'

export class MatchOperator<T> extends IterableOperatorBase<T> {
  match(sequence: ArrayLike<T>): boolean
  match(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
