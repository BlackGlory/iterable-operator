import { applyBinding } from '@style/utils'
import { some as target } from '@output/some'

export function some<T>(this: Iterable<T>, predicate: (element: T, index: number) => unknown): boolean
export function some(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
