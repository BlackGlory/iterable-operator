import { getPipelineProxy } from '@style/utils'
import { flattenBy as target } from '@body/flatten-by'

export function flattenBy<T>(fn: (element: unknown, level: number) => boolean): (iterable: Iterable<unknown>) => Iterable<T>
export function flattenBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
