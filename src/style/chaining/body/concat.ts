import { applyChaining } from '@style/utils'
import { concat as target } from '@body/concat'
import { IterableOperatorBase } from '../iterable-operator-base'
import { IterableOperator } from '../iterable-operator'

export class ConcatOperator<T> extends IterableOperatorBase<T> {
  concat<T1>(iterable: Iterable<T1>): IterableOperator<T | T1>
  concat<T1, T2>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  ): IterableOperator<T | T1 | T2>
  concat<T1, T2, T3>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  ): IterableOperator<T | T1 | T2 | T3>
  concat<T1, T2, T3, T4>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  ): IterableOperator<T | T1 | T2 | T3 | T4>
  concat<T1, T2, T3, T4, T5>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  , iterable5: Iterable<T5>
  ): IterableOperator<T | T1 | T2 | T3 | T4 | T5>
  concat<T1, T2, T3, T4, T5, T6>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  , iterable5: Iterable<T5>
  , iterable6: Iterable<T6>
  ): IterableOperator<T | T1 | T2 | T3 | T4 | T5 | T6>
  concat<T1, T2, T3, T4, T5, T6, T7>(
    iterable1: Iterable<T1>
  , iterable2: Iterable<T2>
  , iterable3: Iterable<T3>
  , iterable4: Iterable<T4>
  , iterable5: Iterable<T5>
  , iterable6: Iterable<T6>
  , iterable7: Iterable<T7>
  ): IterableOperator<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>
  concat<TResult>(...iterables: Iterable<unknown>[]): IterableOperator<TResult>
  concat(...args: unknown[]) {
    return applyChaining(this, target, args)
  }
}
