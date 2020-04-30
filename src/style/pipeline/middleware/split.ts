import { getPipelineProxy } from '@style/utils'
import { split as target } from '@middleware/split'

export function split<T>(separator: T): (iterable: Iterable<T>) => Iterable<T[]>
export function split(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
