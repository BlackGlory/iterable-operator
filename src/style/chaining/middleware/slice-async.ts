import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { sliceAsync as target } from '@middleware/slice-async'

export class SliceAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  sliceAsync(start: number): AsyncIterableOperator<T>
  sliceAsync(start: number, end: number): AsyncIterableOperator<T>
  sliceAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
