import { applyChainingAsync } from '@style/utils'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { dropUntilAsync as target } from '@body/drop-until-async'

export class DropUntilAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  dropUntilAsync<T>(fn: (element: T, index: number) => boolean | Promise<boolean>): AsyncIterableOperator<T>
  dropUntilAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
