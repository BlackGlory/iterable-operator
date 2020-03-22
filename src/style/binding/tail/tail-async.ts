import { applyBinding } from '@style/utils'
import { tailAsync as target } from '@tail/tail-async'

export function tailAsync<T>(this: AsyncIterable<T>): Promise<T>
export function tailAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
