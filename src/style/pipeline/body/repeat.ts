import { getPipelineProxy } from '@style/utils'
import { repeat as target } from '@body/repeat'
export { InvalidArgumentError } from '@body/repeat'

export function repeat<T>(times: number): (iterable: Iterable<T>) => Iterable<T>
export function repeat(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
