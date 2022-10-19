export async function countAsync(
  iterable: AsyncIterable<unknown>
): Promise<number> {
  let count = 0
  for await (const _ of iterable) {
    count++
  }
  return count
}
