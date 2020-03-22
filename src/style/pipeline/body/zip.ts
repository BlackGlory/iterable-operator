import { getPipelineProxy } from '@style/utils'
import { zip as target } from '@body/zip'
export { InvalidArgumentsLengthError } from '@body/zip'

export function zip<T, T1>(iterable1: Iterable<T1>): (iterable: Iterable<T>) => Iterable<Array<T | T1>>
export function zip<T, T1, T2>(iterable1: Iterable<T1>, iterable2: Iterable<T2>): (iterable: Iterable<T>) => Iterable<Array<T | T1 | T2>>
export function zip<T, T1, T2, T3>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): (iterable: Iterable<T>) => Iterable<Array<T | T1 | T2 | T3>>
export function zip<T, T1, T2, T3, T4>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): (iterable: Iterable<T>) => Iterable<Array<T | T1 | T2 | T3 | T4>>
export function zip<T, T1, T2, T3, T4, T5>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>): (iterable: Iterable<T>) => Iterable<Array<T | T1 | T2 | T3 | T4 | T5>>
export function zip<T, T1, T2, T3, T4, T5, T6>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>): (iterable: Iterable<T>) => Iterable<Array<T | T1 | T2 | T3 | T4 | T5 | T6>>
export function zip<T, T1, T2, T3, T4, T5, T6, T7>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>, iterable7: Iterable<T7>): (iterable: Iterable<T>) => Iterable<Array<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>>
export function zip<TResult>(...iterables: Iterable<unknown>[]): (iterable: Iterable<unknown>) => Iterable<TResult[]>
export function zip(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
