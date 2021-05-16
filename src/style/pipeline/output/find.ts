import { getPipelineProxy } from '@style/utils'
import { find as target } from '@output/find'

export function find<T>(
  predicate: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => T | undefined
export function find(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
