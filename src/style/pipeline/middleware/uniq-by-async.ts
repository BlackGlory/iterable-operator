import { getPipelineProxy } from '@style/utils'
import { uniqByAsync as target } from '@middleware/uniq-by-async'
import { Awaitable } from 'justypes'

export function uniqByAsync<T, U>(
  fn: (element: T, index: number) => Awaitable<U>
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
export function uniqByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
