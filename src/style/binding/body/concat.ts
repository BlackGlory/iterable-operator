import { applyBinding } from '@style/utils'
import { concat as target } from '@body/concat'
export { InvalidArgumentsLengthError } from '@body/concat'

export function concat<T, T1>(
  this: Iterable<T>
, iterable: Iterable<T1>
): Iterable<T | T1>
export function concat<T, T1, T2>(
  this: Iterable<T>
, iterable1: Iterable<T1>
, iterable2: Iterable<T2>
): Iterable<T | T1 | T2>
export function concat<T, T1, T2, T3>(
  this: Iterable<T>
, iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
): Iterable<T | T1 | T2 | T3>
export function concat<T, T1, T2, T3, T4>(
  this: Iterable<T>
, iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
): Iterable<T | T1 | T2 | T3 | T4>
export function concat<T, T1, T2, T3, T4, T5>(
  this: Iterable<T>
, iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
, iterable5: Iterable<T5>
): Iterable<T | T1 | T2 | T3 | T4 | T5>
export function concat<T, T1, T2, T3, T4, T5, T6>(
  this: Iterable<T>
, iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
, iterable5: Iterable<T5>
, iterable6: Iterable<T6>
): Iterable<T | T1 | T2 | T3 | T4 | T5 | T6>
export function concat<T, T1, T2, T3, T4, T5, T6, T7>(
  this: Iterable<T>
, iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
, iterable5: Iterable<T5>
, iterable6: Iterable<T6>
, iterable7: Iterable<T7>
): Iterable<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>
export function concat<TResult>(
  this: Iterable<unknown>
, ...iterables: Iterable<unknown>[]
): Iterable<TResult>
export function concat(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
