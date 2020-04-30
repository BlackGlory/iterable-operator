import { applyBinding } from '@style/utils'
import { toArrayAsync as target } from '@output/to-array-async'

export function toArrayAsync<T>(this: AsyncIterable<T>): Promise<T[]>
export function toArrayAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
