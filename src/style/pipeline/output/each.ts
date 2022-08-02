import { getPipelineProxy } from '@style/utils'
import { each as target } from '@output/each'

export function each<T>(
  fn: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => void
export function each(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
