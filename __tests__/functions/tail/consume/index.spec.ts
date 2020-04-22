import { testCall, testPipe, testBind, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { consume as call } from '@tail/consume'
import { consume as pipe } from '@style/pipeline/tail/consume'
import { consume as bind } from '@style/binding/tail/consume'
import { getSyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'

describe('consume', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, consumer: (iterable: Iterable<T> | AsyncIterable<T>) -> U) -> U', call)
  , testPipe('(consumer: (iterable: Iterable<T> | AsyncIterable<T>) -> U) -> (iterable: Iterable<T> | AsyncIterable<T>) -> U', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, consumer: (iterable: Iterable<T> | AsyncIterable<T>) -> U) -> U', bind)
  ])('%s', (_, consume) => {
    describe.each([
      testIterable('(iterable: Iterable<T>, consumer: (iterable: Iterable<T>) -> U) -> U')
    , testAsyncIterable('(iterable: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) -> U) -> U')
    ])('%s', (_, getIter) => {
      describe('call', () => {
        it('return result from consumer', async () => {
          const iter = getIter([1, 2, 3])
          const sum = async (iterable: Iterable<number> | AsyncIterable<number>) => {
            let result = 0
            for await (const value of iterable) {
              result += value
            }
            return result
          }

          const result = consume(iter, sum)
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toEqual(6)
        })
      })

      describe('consumer throw error', () => {
        it('throw error', () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = () => { throw customError }

          const err = getSyncError(() => consume(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
