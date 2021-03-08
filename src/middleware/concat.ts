import { go } from '@blackglory/go'

export function concat<T, U>(iterable: Iterable<T>, ...otherIterables: Iterable<U>[]): Iterable<T | U> {
  return go(function* () {
    for (const iter of [iterable, ...otherIterables]) {
      yield* iter
    }
  })
}
