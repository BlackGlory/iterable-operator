import { getPipelineProxy } from '@style/utils'
import { slice as target } from '@middleware/slice'
export { InvalidArgumentError } from '@middleware/slice'

export function slice<T>(start: number): (iterable: Iterable<T>) => Iterable<T>
export function slice<T>(start: number, end: number): (iterable: Iterable<T>) => Iterable<T>
export function slice(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
