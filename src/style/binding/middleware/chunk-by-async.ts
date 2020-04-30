import { applyBinding } from '@style/utils'
import { chunkByAsync as target } from '@middleware/chunk-by-async'

export function chunkByAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>
export function chunkByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
