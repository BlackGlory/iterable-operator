import { applyBinding } from '@style/utils'
import { splitByAsync as target } from '@body/split-by-async'

export function splitByAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>
export function splitByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
