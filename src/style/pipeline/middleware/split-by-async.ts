import { getPipelineProxy } from '@style/utils'
import { splitByAsync as target } from '@middleware/split-by-async'

export function splitByAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]>
export function splitByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
