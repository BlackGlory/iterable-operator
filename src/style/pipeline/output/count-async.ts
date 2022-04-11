import { getPipelineProxy } from '@style/utils'
import { countAsync as target } from '@output/count-async'

export function countAsync(): (iterable: AsyncIterable<unknown>) => Promise<number>
export function countAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
