import { getPipelineProxy } from '@style/utils'
import { splitAsync as target } from '@body/split-async'

export function splitAsync<T>(separator: T): (iterable: AsyncIterable<T>) => AsyncIterable<T[]>
export function splitAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
