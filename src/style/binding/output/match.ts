import { applyBinding } from '@style/utils'
import { match as target } from '@output/match'

export function match<T>(this: Iterable<T>, sequence: ArrayLike<T>): boolean
export function match(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
