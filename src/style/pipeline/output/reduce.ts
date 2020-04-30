import { getPipelineProxy } from '@style/utils'
import { reduce as target } from '@output/reduce'
export { RuntimeError } from '@output/reduce'

export function reduce<T>(fn: (accumulator: T, currentValue: T, index: number) => T): (iterable: Iterable<T>) => T
export function reduce<T, U>(fn: (accumulator: U, currentValue: T, index: number) => U, initialValue: U): (iterable: Iterable<T>) => U
export function reduce(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
