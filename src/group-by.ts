import { each } from '@src/each.js'

export function groupBy<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => U
): Map<U, T[]> {
  const map = new Map<U, T[]>()

  each(iterable, (element, index) => {
    const key = fn(element, index)

    let group = map.get(key)
    if (!group) {
      group = []
      map.set(key, group)
    }

    group.push(element)
  })

  return map
}
