import { getPipelineProxy } from '@style/utils'
import { takeRight as target } from '@body/take-right'
export { InvalidArgumentError } from '@body/take-right'

export function takeRight<T>(count: number): (iterable: Iterable<T>) => Iterable<T>
export function takeRight(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
