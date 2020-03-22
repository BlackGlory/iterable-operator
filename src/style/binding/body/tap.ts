import { applyBinding } from '@style/utils'
import { tap as target } from '@body/tap'

export function tap<T>(this: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T>
export function tap(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
