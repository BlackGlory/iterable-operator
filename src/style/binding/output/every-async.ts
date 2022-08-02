import { applyBinding } from '@style/utils'
import { everyAsync as target } from '@output/every-async'
import { Awaitable } from 'justypes'

export function everyAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean>
export function everyAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
