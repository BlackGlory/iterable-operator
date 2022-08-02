import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { transformAsync as target } from '@middleware/transform-async'

export class TransformAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  transformAsync<T>(
    transformer: (iterable: U) => AsyncIterable<T>
  ): AsyncIterableOperator<T>
  transformAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
