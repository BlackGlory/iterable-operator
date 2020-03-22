import { getPipelineProxy } from '@style/utils'
import { flatten as target } from '@body/flatten'

export function flatten<T>(): (iterable: Iterable<unknown>) => Iterable<T>
export function flatten(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
