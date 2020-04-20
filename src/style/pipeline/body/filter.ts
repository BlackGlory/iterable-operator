import { getPipelineProxy } from '@style/utils'
import { filter as target } from '@body/filter'

export function filter<T, U extends T = T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<U>
export function filter(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
