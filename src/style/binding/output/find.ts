import { applyBinding } from '@style/utils'
import { find as target } from '@output/find'
export { RuntimeError } from '@output/find'

export function find<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): T
export function find(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
