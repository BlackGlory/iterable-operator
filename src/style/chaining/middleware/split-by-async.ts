import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { splitByAsync as target } from '@middleware/split-by-async'
import { Awaitable } from 'justypes'

export class SplitByAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  splitByAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterableOperator<T[]>
  splitByAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
