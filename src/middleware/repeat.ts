import { go } from '@blackglory/go'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function repeat<T>(iterable: Iterable<T>, times: number): Iterable<T> {
  if (times < 0) throw new InvalidArgumentError('times', '>= 0')

  if (times === Infinity) warnInfiniteLoop()
  return go(function* () {
    const cache: T[] = []
    if (times > 0) {
      for (const element of iterable) {
        yield element
        cache.push(element)
      }
      times--
    }
    while (times > 0) {
      yield* cache
      times--
    }
  })
}

function warnInfiniteLoop(): void {
  if (isProduction()) return
  console.warn('When iterable has no elements and times is Infinity, repeat() will be in dead loop')
}

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}
