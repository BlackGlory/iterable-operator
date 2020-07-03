import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { filterAsync as target } from '@middleware/filter-async'

export class FilterAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  filterAsync<U extends T = T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<U>
  filterAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
