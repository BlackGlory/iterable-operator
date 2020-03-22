import { getPipelineProxy } from '@style/utils'
import { tailAsync as target } from '@tail/tail-async'

export function tailAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>
export function tailAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
