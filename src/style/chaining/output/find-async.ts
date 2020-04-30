import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { findAsync as target } from '@output/find-async'

export class FindAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  findAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<T>
  findAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
