import { applyBinding } from '@style/utils'
import { every as target } from '@output/every'

export function every<T>(
  this: Iterable<T>
, predicate: (element: T, index: number) => unknown
): boolean
export function every(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
