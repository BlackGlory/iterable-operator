import { applyBinding } from '@style/utils'
import { every as target } from '@output/every'

export function every<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): boolean
export function every(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
