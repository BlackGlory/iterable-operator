import { RuntimeError } from '@src/error'
export { RuntimeError }

export function head<T>(iterable: Iterable<T>): T {
  for (const element of iterable) {
    return element
  }
  throw new RuntimeError('Iterable is empty')
}
