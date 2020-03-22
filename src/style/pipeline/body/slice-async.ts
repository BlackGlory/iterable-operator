import { getPipelineProxy } from '@style/utils'
import { sliceAsync as target } from '@body/slice-async'

export function sliceAsync<T>(start: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function sliceAsync<T>(start: number, end: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function sliceAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
