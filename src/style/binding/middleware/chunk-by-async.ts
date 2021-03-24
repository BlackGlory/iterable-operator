import { applyBinding } from '@style/utils'
import { chunkByAsync as target } from '@middleware/chunk-by-async'

export function chunkByAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T[]>
export function chunkByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
