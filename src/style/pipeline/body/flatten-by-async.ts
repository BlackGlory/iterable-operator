import { getPipelineProxy } from '@style/utils'
import { flattenByAsync as target } from '@body/flatten-by-async'

export function flattenByAsync(fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterable<any>
export function flattenByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
