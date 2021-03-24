import { getPipelineProxy } from '@style/utils'
import { dropUntilAsync as target } from '@middleware/drop-until-async'

export function dropUntilAsync<T>(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function dropUntilAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
