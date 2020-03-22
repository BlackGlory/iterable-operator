import { applyBinding } from '@style/utils'
import { dropUntil as target } from '@body/drop-until'

export function dropUntil<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>
export function dropUntil(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
