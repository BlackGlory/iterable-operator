export async function firstAsync<T>(
  iterable: AsyncIterable<T>
): Promise<Awaited<T> | undefined> {
  for await (const element of iterable) {
    return element
  }
  return undefined
}
