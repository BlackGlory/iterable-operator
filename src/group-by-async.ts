import { Awaitable } from 'justypes'
import { eachAsync } from '@src/each-async.js'

export async function groupByAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: Awaited<T>, index: number) => Awaitable<U>
): Promise<Map<Awaited<U>, Array<Awaited<T>>>> {
  const map = new Map<Awaited<U>, Array<Awaited<T>>>()

  await eachAsync(iterable, async (element, index) => {
    const key = await fn(element, index)

    let group = map.get(key)
    if (!group) {
      group = []
      map.set(key, group)
    }

    group.push(element)
  })

  return map
}
