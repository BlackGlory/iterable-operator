import { getPipelineProxy } from '@style/utils'
import { firstAsync as target } from '@tail/first-async'

export function firstAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>
export function firstAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
