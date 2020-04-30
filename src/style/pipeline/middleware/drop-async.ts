import { getPipelineProxy } from '@style/utils'
import { dropAsync as target } from '@middleware/drop-async'

export function dropAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function dropAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
