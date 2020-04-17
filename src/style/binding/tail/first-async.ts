import { applyBinding } from '@style/utils'
import { firstAsync as target } from '@tail/first-async'

export function firstAsync<T>(this: AsyncIterable<T>): Promise<T>
export function firstAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
