import { getPipelineProxy } from '@style/utils'
import { first as target } from '@tail/first'
export { RuntimeError } from '@tail/first'

export function first<T>(): (iterable: Iterable<T>) => T
export function first(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
