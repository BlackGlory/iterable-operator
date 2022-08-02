import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { flattenByAsync as target } from '@middleware/flatten-by-async'
import { Awaitable } from 'justypes'

export class FlattenByAsync<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  flattenByAsync<T>(
    predicate: (element: unknown, level: number) => Awaitable<unknown>
  ): AsyncIterableOperator<T>
  flattenByAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
