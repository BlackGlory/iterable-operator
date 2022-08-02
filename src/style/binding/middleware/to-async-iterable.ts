import { applyBinding } from '@style/utils'
import { toAsyncIterable as target } from '@middleware/to-async-iterable'
import { Awaitable } from 'justypes'

export function toAsyncIterable<T>(this: Iterable<Awaitable<T>>): AsyncIterable<T>
export function toAsyncIterable(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
