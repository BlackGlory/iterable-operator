import { applyBinding } from '@style/utils'
import { includes as target } from '@output/includes'

export function includes<T>(this: Iterable<T>, value: T): boolean
export function includes(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
