import { applyBinding } from '@style/utils'
import { sliceAsync as target } from '@body/slice-async'

export function sliceAsync<T>(this: AsyncIterable<T>, start: number): AsyncIterable<T>
export function sliceAsync<T>(this: AsyncIterable<T>, start: number, end: number): AsyncIterable<T>
export function sliceAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
