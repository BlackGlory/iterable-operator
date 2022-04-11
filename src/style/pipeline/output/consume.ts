import { getPipelineProxy } from '@style/utils'
import { consume as target } from '@output/consume'

export function consume<T extends Iterable<unknown> | AsyncIterable<unknown>, U>(
  consumer: (iterable: T) => U
): (iterable: T) => U
export function consume(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
