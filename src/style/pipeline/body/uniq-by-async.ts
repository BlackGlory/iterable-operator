import { getPipelineProxy } from '@style/utils'
import { uniqByAsync as target } from '@body/uniq-by-async'

export function uniqByAsync<T, U>(fn: (element: T, index: number) => U | PromiseLike<U>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function uniqByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
