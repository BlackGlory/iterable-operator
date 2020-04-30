import { getPipelineProxy } from '@style/utils'
import { take as target } from '@middleware/take'
export { InvalidArgumentError } from '@middleware/take'

export function take<T>(count: number): (iterable: Iterable<T>) => Iterable<T>
export function take(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
