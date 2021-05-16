import { getPipelineProxy } from '@style/utils'
import { firstAsync as target } from '@output/first-async'

export function firstAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T | undefined>
export function firstAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
