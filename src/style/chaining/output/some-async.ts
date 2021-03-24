import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { someAsync as target } from '@output/some-async'

export class SomeAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  someAsync(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<boolean>
  someAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
