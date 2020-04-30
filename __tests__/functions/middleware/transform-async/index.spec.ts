import { isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { testIterable, testAsyncIterable, testCall, testPipe, testBind } from '@test/test-fixtures'
import { transformAsync as call } from '@middleware/transform-async'
import { transformAsync as pipe } from '@style/pipeline/middleware/transform-async'
import { transformAsync as bind } from '@style/binding/middleware/transform-async'
import { getErrorAsync } from 'return-style'

describe.each([
  testCall('transformAsync<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T> | AsyncIterable<T>): AsyncIterable<U>', call)
, testPipe('transformAsync<T, U>(transformer: (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>', pipe)
, testBind('transformAsync<T, U>(this: Iterable<T> | AsyncIterable<T>, transformer: (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>): AsyncIterable<U>', bind)
])('%s', (_, transformAsync) => {
  describe.each([
    testIterable('transformAsync<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T>) => AsyncIterable<U>): AsyncIterable<U>')
  , testAsyncIterable('transformAsync<T, U>(iterable: AsyncIterable<T>, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>): AsyncIterable<U>')
  ])('%s', (_, getIter) => {
    describe('call', () => {
      it('return result from transformer', async () => {
        const iter = getIter([1, 2, 3])
        const double = async function* (iterable: Iterable<number> | AsyncIterable<number>): AsyncIterable<number> {
          for await (const element of iterable) {
            yield element * 2
          }
        }

        const result = transformAsync(iter, double)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([2, 4, 6])
      })

      it('lazy evaluation', async () => {
        const mark = new MarkIterable()
        const iter = getIter(mark)
        const fn = async function* (iterable: Iterable<void> | AsyncIterable<void>) {
          yield* iterable
        }

        const result = transformAsync(iter, fn)
        const isEval1 = mark.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = mark.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })

    describe('transformer throw error', () => {
      it('throw error', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = async function* () { throw customError }

        const result = transformAsync(iter, fn)
        const isIter = isAsyncIterable(result)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
