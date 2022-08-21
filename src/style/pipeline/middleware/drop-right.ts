import { getPipelineProxy } from '@style/utils'
import { dropRight as target } from '@middleware/drop-right'

export function dropRight<T>(count: number): (iterable: T) => IterableIterator<T>
export function dropRight(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
