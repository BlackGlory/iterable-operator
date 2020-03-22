import { applyChaining } from '@style/utils'
import { chunk as target } from '@body/chunk'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class ChunkOperator<T> extends IterableOperatorBase<T> {
  chunk(size: number): IterableOperator<T[]>
  chunk(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
