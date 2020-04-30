import { RuntimeError } from '@src/error'
export { RuntimeError }

export function find<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): T {
  let index = 0
  for (const element of iterable) {
    if (fn(element, index)) return element
    index++
  }
  throw new RuntimeError('Iterable has no matched elements')
}
