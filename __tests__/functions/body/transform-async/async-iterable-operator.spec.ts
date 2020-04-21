import { toAsyncIterable, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'
import { getAsyncError } from '@test/return-style'

const transformAsync = asyncIterableChain(AsyncIterableOperator.prototype.transformAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::transform', () => {
  describe('(transformer: (iterable: AsyncIterable<T>) -> AsyncIterable<U>) -> AsyncIterableOperator<U>', () => {
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
        const err = await getAsyncError(() => toArrayAsync(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
