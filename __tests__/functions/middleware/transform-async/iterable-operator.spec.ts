import { toIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'
import { getErrorAsync } from 'return-style'
import '@test/matchers'

const transformAsync = iterableChainAsync(IterableOperator.prototype.transformAsync)
const getIter = toIterable

describe('AsyncIterableOperator<T>::transform<U>(transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>): AsyncIterableOperator<U>', () => {
  describe('call', () => {
    it('return result from transformer', async () => {
      const iter = getIter([1, 2, 3])
      const double = async function* (iterable: Iterable<number> | AsyncIterable<number>): AsyncIterable<number> {
        for await (const element of iterable) {
          yield element * 2
        }
      }

      const result = transformAsync(iter, double)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
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
      const err = await getErrorAsync(toArrayAsync(result))

      expect(result).toBeAsyncIterable()
      expect(err).toBe(customError)
    })
  })
})