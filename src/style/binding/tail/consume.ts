import { applyBinding } from '@style/utils'
import { consume as target } from '@tail/consume'

export function consume<T, U>(this: Iterable<T>, consumer: U): U
export function consume(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
