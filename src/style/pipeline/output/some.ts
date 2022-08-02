import { getPipelineProxy } from '@style/utils'
import { some as target } from '@output/some'

export function some<T>(
  predicate: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => boolean
export function some(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
