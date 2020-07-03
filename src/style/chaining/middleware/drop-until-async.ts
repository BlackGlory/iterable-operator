import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { dropUntilAsync as target } from '@middleware/drop-until-async'

export class DropUntilAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  dropUntilAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T>
  dropUntilAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
