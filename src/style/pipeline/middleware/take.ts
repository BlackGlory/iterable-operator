import { getPipelineProxy } from '@style/utils'
import { take as target } from '@middleware/take'

export function take<T>(count: number): (iterable: Iterable<T>) => IterableIterator<T>
export function take(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
