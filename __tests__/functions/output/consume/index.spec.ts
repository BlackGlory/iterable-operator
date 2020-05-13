import { testCall, testPipe, testBind, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { consume as call } from '@output/consume'
import { consume as pipe } from '@style/pipeline/output/consume'
import { consume as bind } from '@style/binding/output/consume'
import { getError } from 'return-style'
import '@test/matchers'

describe.each([
  testCall('consume<T, U>(iterable: Iterable<T> | AsyncIterable<T>, consumer: (iterable: Iterable<T> | AsyncIterable<T>) => U): U', call)
, testPipe('consume<T, U>(consumer: (iterable: Iterable<T> | AsyncIterable<T>) => U): (iterable: Iterable<T> | AsyncIterable<T>) => U', pipe)
, testBind('consume<T, U>(this: Iterable<T> | AsyncIterable<T>, consumer: (iterable: Iterable<T> | AsyncIterable<T>) => U): U', bind)
])('%s', (_, consume) => {
  describe.each([
    testIterable('consume<T, U>(iterable: Iterable<T>, consumer: (iterable: Iterable<T>) => U): U')
  , testAsyncIterable('consume<T, U>(iterable: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) => U): U')
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
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual(6)
      })
    })

    describe('consumer throw error', () => {
      it('throw error', () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = () => { throw customError }

        const err = getError(() => consume(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
