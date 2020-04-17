import { getPipelineProxy } from '@style/utils'
import { last as target } from '@tail/last'
export { RuntimeError } from '@tail/last'

export function last<T>(): (iterable: Iterable<T>) => T
export function last(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
