import { applyBinding } from '@style/utils'
import { groupByAsync as target } from '@output/group-by-async'

export function groupByAsync<T, U>(
  this: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => U | PromiseLike<U>
): Promise<Map<U, T[]>>
export function groupByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
