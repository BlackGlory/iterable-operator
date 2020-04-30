import { getPipelineProxy } from '@style/utils'
import { match as target } from '@output/match'

export function match<T>(sequence: ArrayLike<T>): (iterable: Iterable<T>) => boolean
export function match(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
