import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function repeatAsync<T>(
  iterable: AsyncIterable<T>
, times: number
): AsyncIterableIterator<Awaited<T>> {
  assert(
    times === Infinity || Number.isInteger(times)
  , 'The parameter times must be an integer'
  )
  assert(times >= 0, 'The parameter times must be greater than or equal to 0')

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
