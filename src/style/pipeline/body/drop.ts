import { getPipelineProxy } from '@style/utils'
import { drop as target } from '@body/drop'
export { InvalidArgumentError } from '@body/drop'

export function drop<T>(count: number): (iterable: Iterable<T>) => Iterable<T>
export function drop(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
