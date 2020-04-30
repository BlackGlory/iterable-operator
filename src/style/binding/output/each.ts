import { applyBinding } from '@style/utils'
import { each as target } from '@output/each'

export function each<T>(this: Iterable<T>, fn: (element: T, index: number) => unknown): void
export function each(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
