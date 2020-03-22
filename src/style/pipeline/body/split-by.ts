import { getPipelineProxy } from '@style/utils'
import { splitBy as target } from '@body/split-by'

export function splitBy<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T[]>
export function splitBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
