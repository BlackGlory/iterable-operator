import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { tapAsync as target } from '@body/tap-async'

export class TapAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  tapAsync(fn: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterableOperator<T>
  tapAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
