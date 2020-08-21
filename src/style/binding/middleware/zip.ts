import { applyBinding } from '@style/utils'
import { zip as target, ExtractTypeTupleFromIterableTuple } from '@middleware/zip'
export { ExtractTypeTupleFromIterableTuple }

export function zip<T, U extends Array<Iterable<unknown>>>(
  this: Iterable<T>
, ...iterables: U
): Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]>
export function zip(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
