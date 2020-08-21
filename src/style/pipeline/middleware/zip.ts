import { getPipelineProxy } from '@style/utils'
import { zip as target } from '@middleware/zip'

export function zip<T, U extends Array<Iterable<unknown>>>(
  ...iterables: U
): (iterable: T) => Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]>
export function zip(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
