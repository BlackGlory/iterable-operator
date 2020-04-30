import { getError } from 'return-style'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { uniqBy as call } from '@middleware/uniq-by'
import { uniqBy as pipe } from '@style/pipeline/middleware/uniq-by'
import { uniqBy as bind } from '@style/binding/middleware/uniq-by'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('uniqBy<T, U>(iterable: Iterable<T>, fn: (element: T, index: number) => U): Iterable<T>', call)
, testPipe('uniqBy<T, U>(fn: (element: T, index: number) => U): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('uniqBy<T, U>(this: Iterable<T>, fn: (element: T, index: number) => U): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::uniqBy<U>(fn: (element: T, index: number) => U): IterableOperator<T>', IterableOperator.prototype.uniqBy)
])('%s', (_, uniqBy) => {
  describe('fn called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = uniqBy(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      consume(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })
  })

  describe('call', () => {
    it('return iterable unique by fn', () => {
      const iter = [1, 2, 3]
      const modTwo = (x: number) => x % 2

      const result = uniqBy(iter, modTwo)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([1, 2])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = jest.fn()

      const result = uniqBy(iter, fn)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })
  })

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const iter = [1, 2, 3]
      const fn = () => { throw new Error('CustomError') }

      const result = uniqBy(iter, fn)
      const isIter = isIterable(result)
      const err = getError(() => toArray(result))

      expect(isIter).toBe(true)
      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
