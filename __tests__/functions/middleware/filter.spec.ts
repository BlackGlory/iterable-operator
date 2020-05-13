import { getError } from 'return-style'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { filter as call } from '@middleware/filter'
import { filter as pipe } from '@style/pipeline/middleware/filter'
import { filter as bind } from '@style/binding/middleware/filter'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('filter<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>', call)
, testPipe('filter<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('filter<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::filter(fn: (element: T, index: number) => boolean): IterableOperator<T>', IterableOperator.prototype.filter)
])('%s', (_, filter) => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = filter(iter, fn)
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
    it('return filtered iterable', () => {
      const iter = [1, 2, 3]
      const odd = (x: number) => x % 2 === 1

      const result = filter(iter, odd)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 3])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = jest.fn()

      const result = filter(iter, fn)
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

      const result = filter(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
