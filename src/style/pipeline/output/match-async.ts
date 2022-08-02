import { getPipelineProxy } from '@style/utils'
import { matchAsync as target } from '@output/match-async'

export function matchAsync<T>(
  sequence: ArrayLike<T>
): (iterable: AsyncIterable<T>) => Promise<boolean>
export function matchAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
