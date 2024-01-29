export async function toSetAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
): Promise<Set<Awaited<T>>> {
  const result = new Set<Awaited<T>>()
  for await (const element of iterable) {
    result.add(element)
  }
  return result
}
