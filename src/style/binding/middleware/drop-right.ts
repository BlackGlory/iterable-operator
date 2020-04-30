import { applyBinding } from '@style/utils'
import { dropRight as target } from '@middleware/drop-right'
export { InvalidArgumentError } from '@middleware/drop-right'

export function dropRight<T>(this: Iterable<T>, count: number): (iterable: T) => Iterable<T>
export function dropRight(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
