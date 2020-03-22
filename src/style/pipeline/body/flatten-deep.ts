import { getPipelineProxy } from '@style/utils'
import { flattenDeep as target } from '@body/flatten-deep'
export { InvalidArgumentError } from '@body/flatten-deep'

export function flattenDeep<T>(): (iterable: Iterable<unknown>) => Iterable<T>
export function flattenDeep<T>(depth: number): (iterable: Iterable<unknown>) => Iterable<T>
export function flattenDeep(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
