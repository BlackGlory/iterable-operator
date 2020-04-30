import { applyBinding } from '@style/utils'
import { includesAsync as target } from '@output/includes-async'

export function includesAsync<T>(this: AsyncIterable<T>, value: T): Promise<boolean>
export function includesAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
