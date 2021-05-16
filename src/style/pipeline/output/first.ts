import { getPipelineProxy } from '@style/utils'
import { first as target } from '@output/first'

export function first<T>(): (iterable: Iterable<T>) => T | undefined
export function first(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
