import { applyChainingAsync } from '@style/utils'
import { chunkByAsync as target } from '@middleware/chunk-by-async'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'

export class ChunkByAsyncOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  chunkByAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>
  chunkByAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
