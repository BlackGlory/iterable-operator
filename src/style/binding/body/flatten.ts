import { applyBinding } from '@style/utils'
import { flatten as target } from '@body/flatten'

export function flatten<T>(this: Iterable<unknown>): Iterable<T>
export function flatten(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
