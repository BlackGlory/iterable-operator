export function done<T>(iterable: Iterable<T>): T | void {
  let result: T | void
  for (const value of iterable) result = value
  return result
}
