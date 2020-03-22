import { getPipelineProxy } from '@style/utils'
import { uniqAsync as target } from '@body/uniq-async'

export function uniqAsync<T>(): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function uniqAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
