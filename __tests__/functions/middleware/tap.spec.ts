import { getError } from 'return-style'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { tap as call } from '@middleware/tap'
import { tap as pipe } from '@style/pipeline/middleware/tap'
import { tap as bind } from '@style/binding/middleware/tap'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('tap<T>(iterable: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T>', call)
, testPipe('tap<T>(fn: (element: T, index: number) => unknown): (iterable: Iterable) => Iterable<T>', pipe)
, testBind('tap<T>(this: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::tap(fn: (element: T, index: number) => unknown): IterableOperator<T>', IterableOperator.prototype.tap)
])('%s', (_, tap) => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = tap(iter, fn)
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
    it('call fn and return iterable', () => {
      const iter = [1, 2, 3]
      const sideResult: Array<[number, number]> = []
      const pushToSideResult = (x: number, i: number) => sideResult.push([x, i])

      const result = tap(iter, pushToSideResult)
      const isSideResultEmptyInStage1 = !sideResult.length
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(isSideResultEmptyInStage1).toBe(true)
      expect(arrResult).toEqual([1, 2, 3])
      expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = jest.fn()

      const result = tap(iter, fn)
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
      const justThrow = () => { throw new Error('CustomError') }

      const result = tap(iter, justThrow)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
