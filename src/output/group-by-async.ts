import { eachAsync } from '@output/each-async'

export async function groupByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => U | PromiseLike<U>
): Promise<Map<U, T[]>> {
  const map = new Map<U, T[]>()

  await eachAsync(iterable, async (element, index) => {
    const group = await fn(element, index)
    if (!map.has(group)) {
      map.set(group, [])
    }
    map.get(group)!.push(element)
  })

  return map
}
