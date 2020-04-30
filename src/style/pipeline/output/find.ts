import { getPipelineProxy } from '@style/utils'
import { find as target } from '@output/find'
export { RuntimeError } from '@output/find'

export function find<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => T
export function find(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
