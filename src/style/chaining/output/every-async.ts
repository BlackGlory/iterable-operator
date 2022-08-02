import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { everyAsync as target } from '@output/every-async'
import { Awaitable } from 'justypes'

export class EveryAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  everyAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): Promise<boolean>
  everyAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
