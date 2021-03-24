import { RuntimeError } from '@src/error'
export { RuntimeError }

export function find<T>(iterable: Iterable<T>, predicate: (element: T, index: number) => unknown): T {
  let index = 0

  for (const element of iterable) {
    if (predicate(element, index)) return element
    index++
  }

  throw new RuntimeError('Iterable has no matched elements')
}
