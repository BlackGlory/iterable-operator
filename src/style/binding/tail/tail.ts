import { applyBinding } from '@style/utils'
import { tail as target } from '@tail/tail'
export { RuntimeError } from '@tail/tail'

export function tail<T>(this: Iterable<T>): T
export function tail(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
