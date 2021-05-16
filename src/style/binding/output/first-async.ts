import { applyBinding } from '@style/utils'
import { firstAsync as target } from '@output/first-async'

export function firstAsync<T>(this: AsyncIterable<T>): Promise<T | undefined>
export function firstAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
