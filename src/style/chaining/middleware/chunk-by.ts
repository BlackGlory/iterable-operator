import { applyChaining } from '@style/utils'
import { chunkBy as target } from '@middleware/chunk-by'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class ChunkByOperator<T> extends IterableOperatorBase<T> {
  chunkBy(predicate: (element: T, index: number) => unknown): IterableOperator<T[]>
  chunkBy(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
