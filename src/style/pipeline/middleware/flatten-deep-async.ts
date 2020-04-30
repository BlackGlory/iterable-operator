import { getPipelineProxy } from '@style/utils'
import { flattenDeepAsync as target } from '@middleware/flatten-deep-async'

export function flattenDeepAsync<T>(): (iterable: AsyncIterable<unknown>) => AsyncIterable<T>
export function flattenDeepAsync<T>(depth: number): (iterable: AsyncIterable<unknown>) => AsyncIterable<T>
export function flattenDeepAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
