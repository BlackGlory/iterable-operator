import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { flattenByAsync as target } from '@middleware/flatten-by-async'

export class FlattenByAsync<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  flattenByAsync<T>(fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): AsyncIterableOperator<T>
  flattenByAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
