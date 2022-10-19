import { Awaitable } from 'justypes'

export async function toSetAsync<T>(
  iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
): Promise<Set<T>> {
  const result = new Set<T>()
  for await (const element of iterable) {
    result.add(await element)
  }
  return result
}
