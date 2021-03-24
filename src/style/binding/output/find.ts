import { applyBinding } from '@style/utils'
import { find as target } from '@output/find'
export { RuntimeError } from '@output/find'

export function find<T>(this: Iterable<T>, predicate: (element: T, index: number) => unknown): T
export function find(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
