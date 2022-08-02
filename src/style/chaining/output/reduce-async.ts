import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { reduceAsync as target } from '@output/reduce-async'
import { Awaitable } from 'justypes'

export class ReduceAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  reduceAsync(
    fn: (accumulator: T, currentValue: T, index: number) => Awaitable<T>
  ): Promise<T>
  reduceAsync<U>(
    fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
  , initialValue: U
  ): Promise<U>
  reduceAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
