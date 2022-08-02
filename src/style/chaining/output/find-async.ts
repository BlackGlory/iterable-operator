import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { findAsync as target } from '@output/find-async'
import { Awaitable } from 'justypes'

export class FindAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  findAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): Promise<T | undefined>
  findAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
