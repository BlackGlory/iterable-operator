import { applyBinding } from '@style/utils'
import { dropUntilAsync as target } from '@middleware/drop-until-async'

export function dropUntilAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | Promise<boolean>): AsyncIterable<T>
export function dropUntilAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
