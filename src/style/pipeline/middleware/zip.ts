import { getPipelineProxy } from '@style/utils'
import { zip as target, ExtractTypeTupleFromIterableTuple } from '@middleware/zip'
export { ExtractTypeTupleFromIterableTuple }

export function zip<T, U extends Array<Iterable<unknown>>>(
  ...iterables: U
): (iterable: T) => IterableIterator<[T, ...ExtractTypeTupleFromIterableTuple<U>]>
export function zip(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
