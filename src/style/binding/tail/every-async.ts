import { applyBinding } from '@style/utils'
import { everyAsync as target } from '@tail/every-async'

export function everyAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean>
export function everyAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
