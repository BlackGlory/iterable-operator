import { applyBinding } from '@style/utils'
import { head as target } from '@tail/head'
export { RuntimeError } from '@tail/head'

export function head<T>(this: Iterable<T>): T
export function head(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
