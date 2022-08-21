import { applyBinding } from '@style/utils'
import { uniq as target } from '@middleware/uniq'

export function uniq<T>(this: Iterable<T>): IterableIterator<T>
export function uniq(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
