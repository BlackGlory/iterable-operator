import { getPipelineProxy } from '@style/utils'
import { everyAsync as target } from '@tail/every-async'

export function everyAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<boolean>
export function everyAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
