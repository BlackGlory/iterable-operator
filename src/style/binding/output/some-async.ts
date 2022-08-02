import { applyBinding } from '@style/utils'
import { someAsync as target } from '@output/some-async'
import { Awaitable } from 'justypes'

export function someAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean>
export function someAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
