import { applyBinding } from '@style/utils'
import { flattenByAsync as target } from '@middleware/flatten-by-async'

export function flattenByAsync(this: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): AsyncIterable<any>
export function flattenByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
