import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { someAsync as target } from '@output/some-async'

export class SomeAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  someAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean>
  someAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
