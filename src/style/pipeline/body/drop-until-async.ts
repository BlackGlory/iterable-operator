import { getPipelineProxy } from '@style/utils'
import { dropUntilAsync as target } from '@body/drop-until-async'

export function dropUntilAsync<T>(fn: (element: T, index: number) => boolean | Promise<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function dropUntilAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
