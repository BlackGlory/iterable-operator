import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { flattenBy as call } from '@middleware/flatten-by'
import { flattenBy as pipe } from '@style/pipeline/middleware/flatten-by'
import { flattenBy as bind } from '@style/binding/middleware/flatten-by'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getError } from 'return-style'

describe.each([
  testCall('flattenBy<T>(iterable: Iterable<unknown>, fn: (element: unknown, level: number) => boolean): Iterable<T>', call)
, testPipe('flattenBy<T>(fn: (element: unknown, level: number) => boolean): (iterable: Iterable<unknown>) => Iterable<T>', pipe)
, testBind('flattenBy<T>(this: Iterable<unknown>, fn: (element: unknown, level: number) => boolean): Iterable<T>', bind)
, testIterableChain('IterableOperator<unknown>::flattenBy<T>(fn: (element: unknown, level: number) => boolean): IterableOperator<T>', IterableOperator.prototype.flattenBy)
])('%s', (_, flattenBy) => {
  describe('fn is called', () => {
    it('called with [element,level]', () => {
      const iter = [0, [1]]
      const fn = jest.fn().mockReturnValue(true)

      const result = flattenBy(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      consume(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(1)
      expect(fn).nthCalledWith(1, [1], 1)
    })
  })

  describe('call', () => {
    it('return flat iterable', () => {
      const iter = [
        'one', ['two']
      , 0, [1]
      ]
      const exceptString = (x: unknown) => !isString(x)

      const result = flattenBy(iter, exceptString)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([
        'one', 'two'
      , 0, 1
      ])
    })

    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const fn = jest.fn()

      const result = flattenBy(iter, fn)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })
  })

  describe('iterable is empty', () => {
    it('return empty iterable', () => {
      const iter: number[] = []
      const fn = () => true

      const result = flattenBy(iter, fn)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable is string', () => {
    it('return iterable<char>', () => {
      const iter = '123'
      const fn = () => true

      const result = flattenBy(iter, fn)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual(['1', '2', '3'])
    })
  })

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [[1]]
      const fn = () => { throw customError }

      const result = flattenBy(iter, fn)
      const isIter = isIterable(result)
      const err = getError(() => toArray(result))

      expect(isIter).toBe(true)
      expect(err).toBe(customError)
    })
  })
})

function isString(val: unknown): val is string {
  return typeof val === 'string'
}
