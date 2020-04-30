import { applyBinding } from '@style/utils'
import { toSetAsync as target } from '@output/to-set-async'

export function toSetAsync<T>(this: AsyncIterable<T>): Promise<Set<T>>
export function toSetAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
