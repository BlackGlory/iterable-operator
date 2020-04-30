import { getPipelineProxy } from '@style/utils'
import { every as target } from '@output/every'

export function every<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => boolean
export function every(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
