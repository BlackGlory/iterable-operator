// pipe end
export function done<T>(iterable: Iterable<T>): T[] {
  return [...iterable]
}
