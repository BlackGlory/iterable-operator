import { applyBinding } from '@style/utils'
import { flattenAsync as target } from '@body/flatten-async'

export function flattenAsync<T>(this: AsyncIterable<unknown>): AsyncIterable<T>
export function flattenAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
