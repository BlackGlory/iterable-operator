import { each } from '@src/each'

export function groupBy<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => U
): Map<U, T[]> {
  const map = new Map<U, T[]>()

  each(iterable, (element, index) => {
    const group = fn(element, index)
    if (!map.has(group)) {
      map.set(group, [])
    }
    map.get(group)!.push(element)
  })

  return map
}
