import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { repeatAsync as target } from '@middleware/repeat-async'

export class RepeatAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  repeatAsync(times: number): AsyncIterableOperator<T>
  repeatAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
