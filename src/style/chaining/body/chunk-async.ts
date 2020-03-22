import { applyChainingAsync } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { AsyncIterableOperator } from '../async-iterable-operator'
import { chunkAsync as target } from '@body/chunk-async'

export class ChunkAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  chunkAsync(size: number): AsyncIterableOperator<T[]>
  chunkAsync(...args: unknown[]) {
    return applyChainingAsync(this, target, args)
  }
}
