import { flattenDeep } from './flatten-deep'

export function flatten<T, U = T>(iterable: NestedIterable<T>): Iterable<U>
export function flatten<T, U = T>(iterable: NestedIterable<T>, exclude: (value: Iterable<unknown>) => boolean): Iterable<U>
export function flatten<T, U = T>(iterable: NestedIterable<T>, exclude: (value: Iterable<unknown>) => boolean = () => false): Iterable<U> {
  return flattenDeep<T, U>(iterable, 1, exclude)
}
