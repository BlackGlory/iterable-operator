import { consume } from './consume'

export function toSet<T>(iterable: Iterable<T>): Set<T> {
  return consume(iterable, iterable => new Set(iterable))
}
