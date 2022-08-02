import { applyBinding } from '@style/utils'
import { matchAsync as target } from '@output/match-async'

export function matchAsync<T>(
  this: AsyncIterable<T>
, sequence: ArrayLike<T>
): Promise<boolean>
export function matchAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
