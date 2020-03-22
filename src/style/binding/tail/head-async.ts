import { applyBinding } from '@style/utils'
import { headAsync as target } from '@tail/head-async'

export function headAsync<T>(this: AsyncIterable<T>): Promise<T>
export function headAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
