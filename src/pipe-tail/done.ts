export function done<T>(iterable: Iterable<T>): T[]
export function done<T, U extends (iterable: Iterable<T>) => any>(iterable: Iterable<T>, factory: U): ReturnType<U>
export function done<T>(iterable: Iterable<T>, factory = (iterable: Iterable<T>) => Array.from(iterable)) {
  return factory(iterable)
}
