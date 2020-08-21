import { applyChaining } from '@style/utils'
import { zip as target } from '@middleware/zip'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class ZipOperator<T> extends IterableOperatorBase<T> {
  zip<U extends Array<Iterable<unknown>>>(
    ...iterables: U
  ): IterableOperator<[T, ...ExtractTypeTupleFromIterableTuple<U>]>
  zip(...args: unknown[]) {
    return applyChaining(this.subject, target, args)
  }
}
