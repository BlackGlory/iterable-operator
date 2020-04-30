import { applyBinding } from '@style/utils'
import { someAsync as target } from '@output/some-async'

export function someAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean>
export function someAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
