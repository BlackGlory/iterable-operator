import { getPipelineProxy } from '@style/utils'
import { head as target } from '@tail/head'
export { RuntimeError } from '@tail/head'

export function head<T>(): (iterable: Iterable<T>) => T
export function head(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
