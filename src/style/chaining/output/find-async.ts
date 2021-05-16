import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { findAsync as target } from '@output/find-async'

export class FindAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  findAsync(
    predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<T | undefined>
  findAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
