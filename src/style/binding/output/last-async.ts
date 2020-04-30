import { applyBinding } from '@style/utils'
import { lastAsync as target } from '@output/last-async'

export function lastAsync<T>(this: AsyncIterable<T>): Promise<T>
export function lastAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
