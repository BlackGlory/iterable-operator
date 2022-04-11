export function count(iterable: Iterable<unknown>): number {
  let count = 0
  for (const _ of iterable) {
    count++
  }
  return count
}
