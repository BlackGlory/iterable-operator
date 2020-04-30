import { applyBinding } from '@style/utils'
import { takeAsync as target } from '@middleware/take-async'

export function takeAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>
export function takeAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
