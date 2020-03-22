import { getPipelineProxy } from '@style/utils'
import { find as target } from '@tail/find'
export { RuntimeError } from '@tail/find'

export function find<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => T
export function find(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
