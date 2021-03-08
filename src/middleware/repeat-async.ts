import { go } from '@blackglory/go'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function repeatAsync<T>(iterable: AsyncIterable<T>, times: number): AsyncIterable<T> {
  if (times < 0) throw new InvalidArgumentError('times', '>= 0')

  if (times === Infinity) warnInfiniteLoop()
  return go(async function* () {
    const cache: T[] = []
    if (times > 0) {
      for await (const element of iterable) {
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
