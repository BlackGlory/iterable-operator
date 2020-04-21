import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { transformAsync as target } from '@body/transform-async'

export class TransformAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  transformAsync<V>(transformer: (iterable: U) => AsyncIterable<V>): AsyncIterableOperator<V>
  transformAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
