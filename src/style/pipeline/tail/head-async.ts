import { getPipelineProxy } from '@style/utils'
import { headAsync as target } from '@tail/head-async'

export function headAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>
export function headAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
