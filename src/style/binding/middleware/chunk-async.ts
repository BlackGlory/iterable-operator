import { applyBinding } from '@style/utils'
import { chunkAsync as target } from '@middleware/chunk-async'

export function chunkAsync<T>(this: AsyncIterable<T>, size: number): AsyncIterable<T[]>
export function chunkAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
