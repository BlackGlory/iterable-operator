import { applyBinding } from '@style/utils'
import { splitAsync as target } from '@body/split-async'

export function splitAsync<T>(this: AsyncIterable<T>, separator: T): AsyncIterable<T[]>
export function splitAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
