import { getPipelineProxy } from '@style/utils'
import { repeatAsync as target } from '@body/repeat-async'

export function repeatAsync<T>(times: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function repeatAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
