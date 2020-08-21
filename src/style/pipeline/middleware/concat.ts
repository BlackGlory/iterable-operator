import { getPipelineProxy } from '@style/utils'
import { concat as target } from '@middleware/concat'

export function concat<T, U>(...iterables: Iterable<T>[]): (...iterables: Array<Iterable<U>>) => Iterable<T | U>
export function concat(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
