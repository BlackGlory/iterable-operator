import { getPipelineProxy } from '@style/utils'
import { includesAsync as target } from '@output/includes-async'

export function includesAsync<T>(value: T): (iterable: AsyncIterable<T>) => Promise<boolean>
export function includesAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
