import { applyBinding } from '@style/utils'
import { takeRight as target } from '@middleware/take-right'
export { InvalidArgumentError } from '@middleware/take-right'

export function takeRight<T>(this: Iterable<T>, count: number): Iterable<T>
export function takeRight(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
