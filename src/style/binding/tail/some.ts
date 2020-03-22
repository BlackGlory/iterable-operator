import { applyBinding } from '@style/utils'
import { some as target } from '@tail/some'

export function some<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): boolean
export function some(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
