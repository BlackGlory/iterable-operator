import { getPipelineProxy } from '@style/utils'
import { flatten as target } from '@middleware/flatten'

export function flatten<T>(): (iterable: Iterable<unknown>) => IterableIterator<T>
export function flatten(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
