export async function includesAsync<T>(iterable: AsyncIterable<T>, value: T): Promise<boolean> {
  for await (const element of iterable) {
    if (element === value) return true
  }
  return false
}
