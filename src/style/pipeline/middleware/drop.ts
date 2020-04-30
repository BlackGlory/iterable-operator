import { getPipelineProxy } from '@style/utils'
import { drop as target } from '@middleware/drop'
export { InvalidArgumentError } from '@middleware/drop'

export function drop<T>(count: number): (iterable: Iterable<T>) => Iterable<T>
export function drop(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
