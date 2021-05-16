import { getPipelineProxy } from '@style/utils'
import { chunk as target } from '@middleware/chunk'

export function chunk<T>(size: number): (iterable: Iterable<T>) => Iterable<T[]>
export function chunk(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
