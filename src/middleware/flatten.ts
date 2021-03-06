import { flattenDeep } from './flatten-deep'

export function flatten<T>(iterable: Iterable<unknown>): Iterable<T> {
  return flattenDeep<T>(iterable, 1)
}
