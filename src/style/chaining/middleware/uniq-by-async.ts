import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { uniqByAsync as target } from '@middleware/uniq-by-async'

export class UniqByAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  uniqByAsync<U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): AsyncIterableOperator<T>
  uniqByAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
