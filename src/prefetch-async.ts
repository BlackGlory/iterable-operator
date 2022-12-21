import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'
import { Queue } from '@blackglory/structures'
import { ReusableDeferred } from 'extra-promise'
import { AbortController } from 'extra-abort'

export function prefetchAsync<T>(
  iterable: AsyncIterable<T>
, size: number
): AsyncIterableIterator<T> {
  assert(Number.isInteger(size), 'The parameter size must be an integer')
  assert(size > 0, 'The parameter size must be greater than 0')

  let value: T
  let done: boolean | undefined
  const iterator = iterable[Symbol.asyncIterator]()

  const buffer = new Queue<T>()
  const controller = new AbortController()
  const consumed = new ReusableDeferred<void>()
  const prefetched = new ReusableDeferred<void>()
  queueMicrotask(prefetch)

  return go(async function* () {
    try {
      while (true) {
        while (buffer.size) {
          const value = buffer.dequeue()!
          consumed.resolve()
          yield value
        }
        if (done) break

        await prefetched
      }
    } finally {
      controller.abort()
      consumed.reject(controller.signal.reason)
      if (!done) await iterator.return?.()
    }
  })

  async function prefetch(): Promise<void> {
    try {
      while (true) {
        if (controller.signal.aborted) {
          prefetched.reject(controller.signal.reason)
          break
        }
        if (buffer.size < size) {
          ({ value, done } = await iterator.next())

          if (done) {
            prefetched.resolve()
            break
          } else {
            buffer.enqueue(value)
            prefetched.resolve()
          }
        } else {
          await consumed
        }
      }
    } catch (err) {
      prefetched.reject(err)
    }
  }
}
