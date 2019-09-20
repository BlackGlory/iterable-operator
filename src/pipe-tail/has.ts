// pipe end
export function has<T>(iterable: Iterable<T>, value: T): boolean {
  for (const element of iterable) if (element === value) return true
  return false
}