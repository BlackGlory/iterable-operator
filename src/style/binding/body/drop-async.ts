import { applyBinding } from '@style/utils'
import { dropAsync as target } from '@body/drop-async'

export function dropAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>
export function dropAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
