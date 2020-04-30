import { getPipelineProxy } from '@style/utils'
import { toAsyncIterable as target } from '@middleware/to-async-iterable'

export function toAsyncIterable<T>(): (iterable: Iterable<T | PromiseLike<T>>) => AsyncIterable<T>
export function toAsyncIterable(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
