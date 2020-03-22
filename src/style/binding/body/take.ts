import { applyBinding } from '@style/utils'
import { take as target } from '@body/take'
export { InvalidArgumentError } from '@body/take'

export function take<T>(this: Iterable<T>, count: number): Iterable<T>
export function take(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
