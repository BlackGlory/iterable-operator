export function first<T>(iterable: Iterable<T>): T | undefined {
  for (const element of iterable) {
    return element
  }
  return undefined
}
