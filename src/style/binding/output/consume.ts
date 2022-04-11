import { applyBinding } from '@style/utils'
import { consume as target } from '@output/consume'

export function consume<T extends Iterable<unknown> | AsyncIterable<unknown>, U>(
  this: T
, consumer: (iterable: T) => U
): U
export function consume(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
