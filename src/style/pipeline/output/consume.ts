import { getPipelineProxy } from '@style/utils'
import { consume as target } from '@output/consume'

export function consume<T, U>(consumer: (iterable: Iterable<T>) => U): (iterable: Iterable<T>) => U
export function consume(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
