import { getPipelineProxy } from '@style/utils'
import { includes as target } from '@tail/includes'

export function includes<T>(value: T): (iterable: Iterable<T>) => boolean
export function includes(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
