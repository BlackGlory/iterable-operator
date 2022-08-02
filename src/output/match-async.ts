export async function matchAsync<T>(
  iterable: AsyncIterable<T>
, sequence: ArrayLike<T>
): Promise<boolean> {
  const sequenceLength = sequence.length
  let matchCount = 0
  for await (const element of iterable) {
    if (element === sequence[matchCount]) matchCount++
    if (matchCount === sequenceLength) return true
  }
  return false
}
