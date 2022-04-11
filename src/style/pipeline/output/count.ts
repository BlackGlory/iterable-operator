import { getPipelineProxy } from '@style/utils'
import { count as target } from '@output/count'

export function count(): (iterable: Iterable<unknown>) => number
export function count(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
