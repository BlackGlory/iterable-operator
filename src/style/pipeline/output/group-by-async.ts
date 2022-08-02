import { getPipelineProxy } from '@style/utils'
import { groupByAsync as target } from '@output/group-by-async'
import { Awaitable } from 'justypes'

export function groupByAsync<T, U>(
  fn: (element: T, index: number) => Awaitable<U>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<Map<U, T[]>>
export function groupByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
