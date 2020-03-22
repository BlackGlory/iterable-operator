import { applyBinding } from '@style/utils'
import { toAsyncIterable as target } from '@body/to-async-iterable'

export function toAsyncIterable<T>(iterable: Iterable<T | PromiseLike<T>>): AsyncIterable<T>
export function toAsyncIterable(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
