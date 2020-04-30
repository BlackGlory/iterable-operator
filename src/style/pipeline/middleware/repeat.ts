import { getPipelineProxy } from '@style/utils'
import { repeat as target } from '@middleware/repeat'
export { InvalidArgumentError } from '@middleware/repeat'

export function repeat<T>(times: number): (iterable: Iterable<T>) => Iterable<T>
export function repeat(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
