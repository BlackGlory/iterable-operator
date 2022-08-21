import { getPipelineProxy } from '@style/utils'
import { uniq as target } from '@middleware/uniq'

export function uniq<T>(): (iterable: Iterable<T>) => IterableIterator<T>
export function uniq(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
