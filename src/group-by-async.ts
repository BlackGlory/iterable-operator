import { Awaitable } from 'justypes'
import { eachAsync } from '@src/each-async.js'

export async function groupByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: Awaited<T>, index: number) => Awaitable<U>
): Promise<Map<Awaited<U>, Array<Awaited<T>>>> {
  const map = new Map<Awaited<U>, Array<Awaited<T>>>()

  await eachAsync(iterable, async (element, index) => {
    const group = await fn(element, index)
    if (!map.has(group)) {
      map.set(group, [])
    }
    map.get(group)!.push(element)
  })

  return map
}
