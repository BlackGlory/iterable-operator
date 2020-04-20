import { getPipelineProxy } from '@style/utils'
import { transform as target } from '@body/transform'

export function transform<T, U>(transformer: (iterable: Iterable<T>) => Iterable<U>): (iterable: Iterable<T>) => Iterable<U>
export function transform(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
