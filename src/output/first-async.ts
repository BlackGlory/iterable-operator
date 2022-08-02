export async function firstAsync<T>(
  iterable: AsyncIterable<T>
): Promise<T | undefined> {
  for await (const element of iterable) {
    return element
  }
  return undefined
}
