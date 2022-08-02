import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { uniqByAsync as target } from '@middleware/uniq-by-async'
import { Awaitable } from 'justypes'

export class UniqByAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  uniqByAsync<U>(
    fn: (element: T, index: number) => Awaitable<U>
  ): AsyncIterableOperator<T>
  uniqByAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
