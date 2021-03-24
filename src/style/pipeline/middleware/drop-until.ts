import { getPipelineProxy } from '@style/utils'
import { dropUntil as target } from '@middleware/drop-until'

export function dropUntil<T>(predicate: (element: T, index: number) => unknown): (iterable: Iterable<T>) => Iterable<T>
export function dropUntil(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
