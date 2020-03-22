import { applyChaining } from '@style/utils'
import { zip as target } from '@body/zip'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class ZipOperator<T> extends IterableOperatorBase<T> {
  zip<T1>(iterable: Iterable<T1>): IterableOperator<Array<T | T1>>
  zip<T1, T2>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  ): IterableOperator<Array<T | T1 | T2>>
  zip<T1, T2, T3>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  ): IterableOperator<Array<T | T1 | T2 | T3>>
  zip<T1, T2, T3, T4>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  ): IterableOperator<Array<T | T1 | T2 | T3 | T4>>
  zip<T1, T2, T3, T4, T5>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  , iterable5: Iterable<T5>
  ): IterableOperator<Array<T | T1 | T2 | T3 | T4 | T5>>
  zip<T1, T2, T3, T4, T5, T6>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  , iterable5: Iterable<T5>
  , iterable6: Iterable<T6>
  ): IterableOperator<Array<T | T1 | T2 | T3 | T4 | T5 | T6>>
  zip<T1, T2, T3, T4, T5, T6, T7>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  , iterable5: Iterable<T5>
  , iterable6: Iterable<T6>
  , iterable7: Iterable<T7>
  ): IterableOperator<Array<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>>
  zip<TResult>(...iterables: Iterable<unknown>[]): IterableOperator<TResult[]>
  zip(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
