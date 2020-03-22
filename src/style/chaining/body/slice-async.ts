import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { sliceAsync as target } from '@body/slice-async'

export class SliceAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  sliceAsync<T>(start: number): AsyncIterableOperator<T>
  sliceAsync<T>(start: number, end: number): AsyncIterableOperator<T>
  sliceAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
