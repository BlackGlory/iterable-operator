import { applyBinding } from '@style/utils'
import { count as target } from '@output/count'

export function count(this: Iterable<unknown>): number
export function count(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
