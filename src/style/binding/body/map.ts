import { applyBinding } from '@style/utils'
import { map as target } from '@body/map'

export function map<T, U>(this: Iterable<T>, fn: (element: T, index: number) => U): Iterable<U>
export function map(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
