import { applyBinding } from '@style/utils'
import { transform as target } from '@middleware/transform'

export function transform<T, U>(
  this: Iterable<T>
, transformer: (iterable: Iterable<T>) => Iterable<U>
): IterableIterator<U>
export function transform(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
