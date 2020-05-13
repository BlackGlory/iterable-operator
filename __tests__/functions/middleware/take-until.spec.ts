import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { takeUntil as call } from '@middleware/take-until'
import { takeUntil as pipe } from '@style/pipeline/middleware/take-until'
import { takeUntil as bind } from '@style/binding/middleware/take-until'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getError } from 'return-style'
import '@test/matchers'

describe.each([
  testCall('takeUntil<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>', call)
, testPipe('takeUntil<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('takeUntil<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::takeUntil(fn: (element: T, index: number) => boolean): IterableOperator<T>', IterableOperator.prototype.takeUntil)
])('%s', (_, takeUntil) => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn().mockReturnValue(false)

      const result = takeUntil(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      consume(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('return true on first element', () => {
      it('called once', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn().mockReturnValueOnce(true)

        const result = takeUntil(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        consume(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(1)
      })
    })
  })

  describe('call', () => {
    it('return itreable take elements until fn return true', () => {
      const iter = [1, 2, 3]
      const atTwo = (x: number) => x === 2

      const result = takeUntil(iter, atTwo)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = jest.fn()

      const result = takeUntil(iter, fn)
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
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = takeUntil(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBe(customError)
    })
  })
})
