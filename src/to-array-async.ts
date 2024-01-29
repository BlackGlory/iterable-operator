export async function toArrayAsync<T>(
  iterable: AsyncIterable<T>
): Promise<Array<Awaited<T>>> {
  const result: Array<Awaited<T>> = []

  for await (const element of iterable) {
    result.push(element)
  }

  return result
}
