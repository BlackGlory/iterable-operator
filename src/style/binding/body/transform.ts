import { applyBinding } from '@style/utils'
import { transform as target } from '@body/transform'

export function transform<T, U>(this: Iterable<T>, transformer: (iterable: Iterable<T>) => Iterable<U>): Iterable<U>
export function transform(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
