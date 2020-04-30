import { applyBinding } from '@style/utils'
import { filter as target } from '@middleware/filter'

export function filter<T, U extends T = T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<U>
export function filter(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
