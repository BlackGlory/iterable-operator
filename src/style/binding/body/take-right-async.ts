import { applyBinding } from '@style/utils'
import { takeRightAsync as target } from '@body/take-right-async'

export function takeRightAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>
export function takeRightAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
