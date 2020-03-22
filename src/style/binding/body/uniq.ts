import { applyBinding } from '@style/utils'
import { uniq as target } from '@body/uniq'

export function uniq<T>(this: Iterable<T>): Iterable<T>
export function uniq(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
