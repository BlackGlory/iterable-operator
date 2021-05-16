import { getPipelineProxy } from '@style/utils'
import { last as target } from '@output/last'

export function last<T>(): (iterable: Iterable<T>) => T | undefined
export function last(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
