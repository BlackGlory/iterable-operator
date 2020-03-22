import { getPipelineProxy } from '@style/utils'
import { slice as target } from '@body/slice'
export { InvalidArgumentError } from '@body/slice'

export function slice<T>(start: number): (iterable: Iterable<T>) => Iterable<T>
export function slice<T>(start: number, end: number): (iterable: Iterable<T>) => Iterable<T>
export function slice(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
