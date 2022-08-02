import { getPipelineProxy } from '@style/utils'
import { takeUntil as target } from '@middleware/take-until'

export function takeUntil<T>(
  predicate: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => Iterable<T>
export function takeUntil(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
