import { getPipelineProxy } from '@style/utils'
import { someAsync as target } from '@tail/some-async'

export function someAsync<T>(fn: (element: T, index: number) => boolean | Promise<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<boolean>
export function someAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
