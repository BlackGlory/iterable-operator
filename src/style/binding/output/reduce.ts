import { applyBinding } from '@style/utils'
import { reduce as target } from '@output/reduce'
export { RuntimeError } from '@output/reduce'

export function reduce<T>(
  this: Iterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => T
): T
export function reduce<T, U>(
  this: Iterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => U
, initialValue: U
): U
export function reduce(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
