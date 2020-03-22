import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { splitByAsync as target } from '@body/split-by-async'

export class SplitByAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  splitByAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>
  splitByAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
