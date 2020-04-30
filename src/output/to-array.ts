import { consume } from './consume'

export function toArray<T>(iterable: Iterable<T>): T[] {
  return consume(iterable, iterable => Array.from(iterable))
}
