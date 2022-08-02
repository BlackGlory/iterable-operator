import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { mapAsync as target } from '@middleware/map-async'

export class MapAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  mapAsync<U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): AsyncIterableOperator<U>
  mapAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
