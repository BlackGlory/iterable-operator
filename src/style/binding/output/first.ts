import { applyBinding } from '@style/utils'
import { first as target } from '@output/first'
export { RuntimeError } from '@output/first'

export function first<T>(this: Iterable<T>): T
export function first(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
