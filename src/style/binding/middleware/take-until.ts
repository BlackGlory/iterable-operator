import { applyBinding } from '@style/utils'
import { takeUntil as target } from '@middleware/take-until'

export function takeUntil<T>(this: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T>
export function takeUntil(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
