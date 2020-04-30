import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { toArray, isIterable, MarkIterable } from '@test/utils'
import { transform as call } from '@middleware/transform'
import { transform as pipe } from '@style/pipeline/middleware/transform'
import { transform as bind } from '@style/binding/middleware/transform'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getError } from 'return-style'

describe.each([
  testCall('transform<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T>) => Iterable<U>): Iterable<U>', call)
, testPipe('transform<T, U>(transformer: (iterable: Iterable<T>) => Iterable<U>): (iterable: Iterable<T>) => Iterable<U>', pipe)
, testBind('transform<T, U>(this: Iterable<T>, transformer: (iterable: Iterable<T>) => Iterable<U>): Iterable<U>', bind)
, testMethod('IterableOperator<T>::transform<U>(transformer: (iterable: Iterable<T>) => Iterable<U>): IterableOperator<U>', IterableOperator.prototype.transform)
])('%s', (_, transform) => {
  describe('call', () => {
    it('return result from transformer', () => {
      const iter = [1, 2, 3]
      const double = function* (iterable: Iterable<number>) {
        for (const element of iterable) {
          yield element * 2
        }
      }

      const result = transform(iter, double)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([2, 4, 6])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = function* (iterable: Iterable<void>) {
        yield* iterable
      }

      const result = transform(iter, fn)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })
  })

  describe('transformer throw error', () => {
    it('throw error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = transform(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBe(customError)
    })
  })
})
