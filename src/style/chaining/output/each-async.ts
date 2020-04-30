import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { eachAsync as target } from '@output/each-async'

export class EachAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  eachAsync(fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void>
  eachAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
