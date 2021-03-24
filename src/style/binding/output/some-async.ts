import { applyBinding } from '@style/utils'
import { someAsync as target } from '@output/some-async'

export function someAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<boolean>
export function someAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
