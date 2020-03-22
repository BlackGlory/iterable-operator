import { applyBinding } from '@style/utils'
import { find as target } from '@tail/find'
export { RuntimeError } from '@tail/find'

export function find<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): T
export function find(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
