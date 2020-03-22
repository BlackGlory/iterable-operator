import { applyBinding } from '@style/utils'
import { Subject } from '../subject'
import { everyAsync as target } from '@tail/every-async'

export class EveryAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  everyAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean>
  everyAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
