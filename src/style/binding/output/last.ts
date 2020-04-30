import { applyBinding } from '@style/utils'
import { last as target } from '@output/last'
export { RuntimeError } from '@output/last'

export function last<T>(this: Iterable<T>): T
export function last(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
