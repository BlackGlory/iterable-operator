import { getPipelineProxy } from '@style/utils'
import { tail as target } from '@tail/tail'
export { RuntimeError } from '@tail/tail'

export function tail<T>(): (iterable: Iterable<T>) => T
export function tail(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
