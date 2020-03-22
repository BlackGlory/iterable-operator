import { applyBinding } from '@style/utils'
import { filter as target } from '@body/filter'

export function filter<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>
export function filter(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
