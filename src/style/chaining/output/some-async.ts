import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { someAsync as target } from '@output/some-async'
import { Awaitable } from 'justypes'

export class SomeAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  someAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): Promise<boolean>
  someAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
