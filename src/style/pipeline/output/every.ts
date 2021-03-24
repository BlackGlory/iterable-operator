import { getPipelineProxy } from '@style/utils'
import { every as target } from '@output/every'

export function every<T>(predicate: (element: T, index: number) => unknown): (iterable: Iterable<T>) => boolean
export function every(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
