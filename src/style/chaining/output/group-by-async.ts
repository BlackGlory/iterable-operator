import { applyBinding } from '@style/utils'
import { groupByAsync as target } from '@output/group-by-async'
import { Subject } from '../subject'
import { Awaitable } from 'justypes'

export class GroupByAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  groupByAsync<V>(
    fn: (element: T, index: number) => Awaitable<V>
  ): Promise<Map<V, T[]>>
  groupByAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
