import { applyBinding } from '@style/utils'
import { countAsync as target } from '@output/count-async'

export function countAsync(this: AsyncIterable<unknown>): Promise<number>
export function countAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
