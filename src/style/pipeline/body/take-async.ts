import { getPipelineProxy } from '@style/utils'
import { takeAsync as target } from '@body/take-async'

export function takeAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function takeAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
