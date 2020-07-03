import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { matchAsync as target } from '@output/match-async'

export class MatchAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  matchAsync(sequence: ArrayLike<T>): Promise<boolean>
  matchAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
