import { getPipelineProxy } from '@style/utils'
import { dropUntil as target } from '@body/drop-until'

export function dropUntil<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>
export function dropUntil(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
