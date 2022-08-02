import { getPipelineProxy } from '@style/utils'
import { toAsyncIterable as target } from '@middleware/to-async-iterable'
import { Awaitable } from 'justypes'

export function toAsyncIterable<T>(): (
  iterable: Iterable<Awaitable<T>>
) => AsyncIterable<T>
export function toAsyncIterable(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
