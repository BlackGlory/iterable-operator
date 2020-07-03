import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { reduceAsync as target } from '@output/reduce-async'

export class ReduceAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  reduceAsync(
    fn: (accumulator: T, currentValue: T, index: number) => T | PromiseLike<T>
  ): Promise<T>
  reduceAsync<U>(
    fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
  , initialValue: U
  ): Promise<U>
  reduceAsync(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
