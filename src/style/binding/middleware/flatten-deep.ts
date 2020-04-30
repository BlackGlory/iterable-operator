import { applyBinding } from '@style/utils'
import { flattenDeep as target } from '@middleware/flatten-deep'
export { InvalidArgumentError } from '@middleware/flatten-deep'

export function flattenDeep<T>(this: Iterable<unknown>): Iterable<T>
export function flattenDeep<T>(this: Iterable<unknown>, depth: number): Iterable<T>
export function flattenDeep(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
