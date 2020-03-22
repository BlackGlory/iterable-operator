import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { filterAsync as target } from '@body/filter-async'

export class FilterAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  filterAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T>
  filterAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
