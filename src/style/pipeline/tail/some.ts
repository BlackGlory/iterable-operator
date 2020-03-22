import { getPipelineProxy } from '@style/utils'
import { some as target } from '@tail/some'

export function some<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => boolean
export function some(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
