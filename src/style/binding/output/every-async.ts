import { applyBinding } from '@style/utils'
import { everyAsync as target } from '@output/every-async'

export function everyAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<boolean>
export function everyAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
