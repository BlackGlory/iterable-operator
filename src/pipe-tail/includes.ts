export function includes<T>(iterable: Iterable<T>, sequence: ArrayLike<T>): boolean {
  const sequenceLength = sequence.length
  let matchCount = 0
  for (const element of iterable) {
    if (element === sequence[matchCount]) matchCount++
    if (matchCount === sequenceLength) return true
  }
  return false
}
