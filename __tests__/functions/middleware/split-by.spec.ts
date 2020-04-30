import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { splitBy as call } from '@middleware/split-by'
import { splitBy as pipe } from '@style/pipeline/middleware/split-by'
import { splitBy as bind } from '@style/binding/middleware/split-by'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getError } from 'return-style'

describe.each([
  testCall('splitBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>', call)
, testPipe('splitBy<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T[]>', pipe)
, testBind('splitBy<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>', bind)
, testIterableChain('IterableOperator<T>::splitBy(fn: (element: T, index: number) => boolean): IterableOperator<T[]>', IterableOperator.prototype.splitBy)
])('%s', (_, splitBy) => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = splitBy(iter, fn)
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
    it('return splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const atThree = (x: number) =>  x === 3

      const result = splitBy(iter, atThree)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([[1, 2], [4, 5]])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = jest.fn()

      const result = splitBy(iter, fn)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })
  })

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3, 4, 5]
      const fn = () => { throw customError }

      const result = splitBy(iter, fn)
      const isIter = isIterable(result)
      const err = getError(() => toArray(result))

      expect(isIter).toBe(true)
      expect(err).toBe(customError)
    })
  })
})
