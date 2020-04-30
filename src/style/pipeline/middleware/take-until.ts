import { getPipelineProxy } from '@style/utils'
import { takeUntil as target } from '@middleware/take-until'

export function takeUntil<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>
export function takeUntil(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
