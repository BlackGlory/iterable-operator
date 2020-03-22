import { applyBinding } from '@style/utils'
import { chunkBy as target } from '@body/chunk-by'

export function chunkBy<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>
export function chunkBy(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
