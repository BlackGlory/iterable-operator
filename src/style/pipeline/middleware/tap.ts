import { getPipelineProxy } from '@style/utils'
import { tap as target } from '@middleware/tap'

export function tap<T>(
  fn: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => Iterable<T>
export function tap(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
