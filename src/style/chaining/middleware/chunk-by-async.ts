import { applyChainingAsync } from '@style/utils'
import { chunkByAsync as target } from '@middleware/chunk-by-async'
import { Subject } from '../subject'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { Awaitable } from 'justypes'

export class ChunkByAsyncOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  chunkByAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterableOperator<T[]>
  chunkByAsync(...args: unknown[]) {
    return applyChainingAsync(this.subject, target, args)
  }
}
